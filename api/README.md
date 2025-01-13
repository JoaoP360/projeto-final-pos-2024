# Codigo para rodar a Api

## Crie a Venv
python -m venv venv


## Ativar a Venv
.venv\Scripts\activate

## Baixar os requirements.txt
pip install -r requirements.txt

## Dar migrate no Banco de Dados do Django
python manage.py migrate

## Rodar o Servidor
python manage.py runserver
