# Instalação de Dependências

- __(Thalysson)__ Hove um problema na instalação do pacote Sharp no meu computador, na hora de executar o comando `npm run dev`, a versão miníma que o node deve estar é 20.3.0,ou seja, atualize ou mude de versão do node e vá
na parte de __Sharp Problem__ 

# Comandos do Git

- `git add . && git commit -m "Insira uma mensagem" && git push origin 0-insira-sua-branch` Adiciona, comita e envia alterações para a branch especificada;
- `git pull --no-commit --no-ff origin branch` Faz pull sem criar um commit automático ou fast-forward;
- `git config -e --config` COnfigurar o email e o usuário no vscode

# Comandos Diversos

- `sudo kill -9 $(sudo lsof -t -i:3051)` &rarr; Derruba uma porta

## Para atualizar ou mudar de versão do node siga os seguintes passos:
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`;

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
- `nvm install 20.3.0`

## Sharp Problem

- `npm install --include=optional sharp && npm install --os=linux --cpu=x64 sharp`
