# 🛠️ Como rodar o projeto

Este repositório contém dois projetos separados:

- `Backend/`: API em **Python**.
- `Frontend/controle-estoque/`: Aplicação **React**.

---

> ℹ️ Este README foi criado para facilitar a execução **local** dos projetos do repositório original.  
> Para acessar o repositório principal, acesse:  
> 👉 [Repositório original](https://github.com/Vyce96/Estoque_PI01)

---

## ⚙️ Backend (Python)

### Pré-requisitos
- Python 3.10+
- pip

### Passos

```bash
cd Backend
pip install -r .\requirements.txt
py .\app.py 
```

---

## 🖥️ Frontend (React)

### Pré-requisitos
- Node.js 18+
- npm

### Passos

```bash
cd Frontend/controle-estoque
npm install
npm run dev         
```

🧰 Melhorias Técnicas Implementadas

Recriação completa do ambiente virtual do back-end (venv) para corrigir falhas e garantir compatibilidade entre os ambientes locais.

Instalação e padronização das dependências do Flask:

flask

flask_sqlalchemy

flask_bcrypt

flask_cors

PyJWT

Geração do arquivo requirements.txt atualizado, garantindo reprodutibilidade do ambiente para toda a equipe.

Criação do arquivo .gitignore para evitar o versionamento de arquivos temporários e específicos do ambiente local (venv/, __pycache__/, instance/).

Validação do back-end rodando localmente com sucesso em http://127.0.0.1:5000/.

Organização do fluxo Git: criação da branch update-flask e padronização do push via fork, com Pull Request documentando as melhorias.
