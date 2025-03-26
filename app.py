# CONFIGURAÇÃO DO FLASK
# CONEXÃO AO DB
# DEFINE ADICIONAR / REMOVER / LISTAR PRODUTOS


from flask import Flask, render_template, redirect, url_for, request
from models import db, Produto
from forms import ProdutoForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///estoque.db'
app.config['SECRET_KEY'] = 'chave_secreta'

db.init_app(app)

@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)

@app.route('/add', methods=['GET','POST'])
def add_produto():
    form = ProdutoForm()
    if form.validate_on_submit():
        novo_produto = Produto(
            nome = form.nome.data,
            quantidade = form.quantidade.data,
            preco = form.preco.data
        )
        db.session.add(novo_produto)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add_produto.html', form=form)

@app.route('/delete/<int:id>')
def delete_produto(id):
    produto = Produto.query.get(id)
    if produto:
        db.session.delete(produto)
        db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)