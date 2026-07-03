import sys

with open("src/components/Services.tsx", "r") as f:
    content = f.read()

target = "const addons = ["
new_addons = """const addons = [
  {
    title: 'Каталог товаров и услуг',
    price: '7 990 ₽',
    desc: 'Добавление каталога с вашими товарами или услугами на сайт.',
    action: 'Оплатить'
  },
  {
    title: 'Интеграция с системами CRM',
    price: '5 900 ₽',
    desc: 'Связь сайта с вашей CRM для автоматического получения заявок.',
    action: 'Оплатить'
  },
  {
    title: 'Корзина',
    price: 'от 10 790 ₽',
    desc: 'Функционал корзины для оформления заказов на сайте.',
    action: 'Оплатить'
  },
  {
    title: 'Подключение карт и геосервисов',
    price: 'от 3 900 ₽',
    desc: 'Интеграция интерактивных Яндекс или Google карт.',
    action: 'Оплатить'
  },
  {
    title: 'Калькулятор стоимости',
    price: 'от 7 990 ₽',
    desc: 'Интерактивный калькулятор для расчёта стоимости ваших услуг.',
    action: 'Оплатить'
  },
  {
    title: 'Политика конфиденциальности и документы',
    price: 'от 2 900 ₽',
    desc: 'Составление и размещение обязательных правовых документов.',
    action: 'Оплатить'
  },"""

content = content.replace(target, new_addons)

with open("src/components/Services.tsx", "w") as f:
    f.write(content)
print("Updated successfully")
