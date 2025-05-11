from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///estoque.db'
app.config['SECRET_KEY'] = 'chavedasboas'

# Extensões
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Modelos
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    validade = db.Column(db.Date, nullable=False)

# Geração e verificação de token JWT
def gerar_token(usuario_id):
    payload = {
        'usuario_id': usuario_id,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

def verificar_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['usuario_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Decorador de login com JWT
def login_requerido(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')

        usuario_id = verificar_token(token)
        if not usuario_id:
            return jsonify({'erro': 'Token inválido ou expirado'}), 401

        return f(*args, **kwargs)
    return decorated_function

# Login (gera token)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    usuario = Usuario.query.filter_by(username=username).first()

    if usuario and usuario.check_password(password):
        token = gerar_token(usuario.id)
        return jsonify({'mensagem': 'Login realizado com sucesso', 'token': token}), 200
    else:
        return jsonify({'erro': 'Usuário ou senha inválidos'}), 401

# Logout (sem efeito real com JWT)
@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({'mensagem': 'Logout simbólico com JWT — apenas descarte o token no cliente'}), 200

# Listar produtos
@app.route('/produtos', methods=['GET'])
@login_requerido
def listar_produtos():
    produtos = Produto.query.all()
    lista = [
        {
            'id': p.id,
            'nome': p.nome,
            'quantidade': p.quantidade,
            'preco': p.preco,
            'validade': p.validade.strftime('%Y-%m-%d')
        } for p in produtos
    ]
    return jsonify(lista), 200

# Adicionar produtos
@app.route('/produtos', methods=['POST'])
@login_requerido
def add_produto():
    data = request.get_json()

    try:
        nome = data['nome']
        quantidade = int(data['quantidade'])
        preco = float(str(data['preco']).replace(',', '.'))
        validade = datetime.strptime(data['validade'], '%Y-%m-%d').date()

        if quantidade <= 0 or preco < 0:
            return jsonify({'erro': 'Quantidade e preço devem ser positivos'}), 400

    except (KeyError, ValueError):
        return jsonify({'erro': 'Dados inválidos ou ausentes'}), 400

    novo_produto = Produto(nome=nome, quantidade=quantidade, preco=preco, validade=validade)
    db.session.add(novo_produto)
    db.session.commit()

    return jsonify({'mensagem': 'Produto adicionado com sucesso'}), 201

# Editar produtos
@app.route('/produtos/<int:id>', methods=['PUT'])
@login_requerido
def editar_produto(id):
    produto = Produto.query.get_or_404(id)
    data = request.get_json()

    try:
        produto.quantidade = int(data['quantidade'])
        produto.preco = float(str(data['preco']).replace(',', '.'))
        produto.validade = datetime.strptime(data['validade'], '%Y-%m-%d').date()

        if produto.quantidade <= 0 or produto.preco < 0:
            return jsonify({'erro': 'Quantidade e preço devem ser positivos'}), 400

    except (KeyError, ValueError):
        return jsonify({'erro': 'Dados inválidos ou ausentes'}), 400

    db.session.commit()
    return jsonify({'mensagem': 'Produto atualizado com sucesso'}), 200

# Deletar produto
@app.route('/produtos/<int:id>', methods=['DELETE'])
@login_requerido
def delete_produto(id):
    produto = Produto.query.get_or_404(id)
    db.session.delete(produto)
    db.session.commit()
    return jsonify({'mensagem': 'Produto deletado com sucesso'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
