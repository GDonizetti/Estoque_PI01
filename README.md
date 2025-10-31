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

Reestruturação completa do back-end em Flask para garantir estabilidade, repetibilidade e preparo para integração com o front-end.
1. Padronização do ambiente e dependências


Recriação completa do ambiente virtual do back-end (venv) para corrigir falhas e garantir compatibilidade entre as máquinas do grupo.


Padronização e atualização das dependências no arquivo requirements.txt, incluindo:


flask


flask_sqlalchemy


flask_bcrypt


flask_cors


PyJWT




Criação do arquivo .gitignore para evitar envio de arquivos temporários e específicos de ambiente local (venv/, __pycache__/, instance/).


2. Persistência de dados do estoque


Configuração do SQLAlchemy para usar banco SQLite persistente (sqlite:///estoque.db).


Antes, os itens cadastrados no estoque sumiam ao reiniciar o servidor Flask (os dados ficavam só na memória).


Agora, os dados são gravados no arquivo estoque.db, o que mantém os produtos cadastrados mesmo após parar e iniciar de novo o servidor.
Isso garante rastreabilidade do estoque e consistência para demonstração do sistema.


3. Backend funcional e pronto para consumo pelo front-end


Ativação de CORS (flask_cors) para permitir que o front-end React consiga consumir a API Flask sem bloqueio de navegador.


Manutenção do sistema de login/autenticação funcionando.


Separação clara entre back-end (Backend/) e front-end (Frontend/) para organização do projeto.


4. Validação e fluxo de entrega


Back-end testado e rodando localmente com sucesso em http://127.0.0.1:5000/.


Criação da branch update-flask e envio via fork.


Abertura de Pull Request com todas as melhorias acima, solicitando integração na main do repositório original do grupo.



Explica a persistência de dados do estoque — que é melhoria real de negócio.


Mostra que você formalizou processo (branch, fork, PR). Isso é ponto individual na avaliação.


Próximo passo natural agora:
cola isso no README, salva, faz git add README.md, git commit -m "Atualiza README com persistência e padronização", e depois git push myfork update-flask. Isso atualiza o PR automaticamente e coloca sua assinatura técnica dentro do histórico oficial.
