#  Алгоритм пошуку маршрутів


1.  Вибрати всі маршрути до точки призначення
2.  Якщо є прямий маршрут зберегти його
3.  Вибрати всі маршрути до всіх початкових точок з першого пункту
4.  Знайти всі маршрути до всіх точок призначення, що є відправними точками до останньої точки призначення за умови що час прибуття туди на пів години
менший за час відправки до наступного пункту.
5.  Повторювати рекурсивно пункти 2-4 поки не знайдемо всі маршрути. Проблеми коли маршрут зациклиться не буде, так я є умова з часом
6.  Порахувати в маршрутах параметри такі як кількість пересадок, ціна і час.
7.  Повернути найефективніші маршрути.

Для запитів зробив так як в завданні, тобто параметри потрібно вводити як urlencoded в строку запиту, а не в body.

Часу було мало тому подорожі видаються лише ті, які прямі. І нажаль не зробив адмін частину для турагенцій, але через postman все перевіряв і все працює.

