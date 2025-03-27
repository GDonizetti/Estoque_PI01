from flask import Flask, render_template, redirect, url_for, request, flash, session
from models import db, Produto, Usuario, bcrypt
from forms import ProdutoForm, LoginForm
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///estoque.db'
app.config['SECRET_KEY'] = 'sua_chave_secreta'

db.init_app(app)

def login_requerido(f):
    @wraps(f)
    def decorated_function(*args,**kwargs):
        if 'usuario_id' not in session:
            flash('Realize o login para acessar a pagina.','warning')
            return redirect(url_for(login))
        return f(*args,**kwargs)
    return decorated_function

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        usuario = Usuario.query.filter_by(username=form.username.data).first()
        if usuario and usuario.check_password(form.password.data):
            session['usuario_id'] = usuario.id
            flash('Login realizado com sucesso', 'success')
            return redirect(url_for('index'))
        else:
            flash('Usuário ou senha inválidos', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    session.pop('usuario_id', None)
    flash('Você saiu', 'info')
    return redirect(url_for('login'))

@app.route('/')
def index():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    query = request.args.get('q')
    if query:
        produtos = Produto.query.filter(Produto.nome.contains(query)).all()
    else:
        produtos = Produto.query.all()
    print(produtos)
    return render_template('index.html', produtos=produtos)

@app.route('/add', methods=['GET', 'POST'])
def add_produto():
    form = ProdutoForm()
    if form.validate_on_submit():
        print(f"Adicionando: Nome={form.nome.data}, Quantidade={form.quantidade.data}, Preço={form.preco.data}")
        novo_produto = Produto(
            nome=form.nome.data,
            quantidade=form.quantidade.data,
            preco=form.preco.data
        )
        db.session.add(novo_produto)
        db.session.commit()
        return redirect(url_for('index'))
    else:
        print("Erro no formulário:", form.errors)
    return render_template('add_produto.html', form=form)

@app.route('/delete/<int:id>', methods=['POST'])
@login_requerido
def delete_produto(id):
    produto = Produto.query.get(id)
    if produto:
        db.session.delete(produto)
        db.session.commit()
    return redirect(url_for('index'))

@app.route('/editar/<int:id>', methods=['GET', 'POST'])
@login_requerido
def editar_produto(id):
    produto = Produto.query.get_or_404(id)
    form = ProdutoForm(obj=produto)
    if request.method == 'POST' and form.validate_on_submit():
        produto.quantidade = form.quantidade.data
        produto.preco = form.preco.data
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('editar_produto.html', form=form, produto=produto)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
