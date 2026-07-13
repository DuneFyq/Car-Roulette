<script lang="ts" setup>
const navItems = [
  { id: "referee-general", text: "Общее и Судья" },
  { id: "discipline", text: "Дисциплины" },
  { id: "car", text: "Машины" },
  { id: "card", text: "Рулетка ходов и Карточки" },
  { id: "player", text: "Игроки" },
  { id: "points", text: "Баллы" },
  { id: "elite-card", text: "Элитные карточки / Крафты" },
  { id: "pandora", text: "Ящик Пандоры" },
  { id: "modifier", text: "Модификаторы" },
  { id: "shop", text: "Магазин" },
];

const disciplines = [
  { id: 0, name: "Драг-гонка", action: "" },
  { id: 1, name: "Гонка по асфальту", action: "" },
  { id: 2, name: "Гонка по бездорожью", action: "" },
  { id: 3, name: "Битва стиля", action: "" },
  { id: 4, name: "Подъём в гору", action: "" },
  { id: 5, name: "Дрифт", action: "" },
  { id: 6, name: "Флаги", action: "" },
  { id: 7, name: "Вышибалы", action: "" },
  { id: 8, name: "Прыжок", action: "" },
];

const purchasedItems = [
  { name: "Клон", cost: "0.25" },
  { name: "Дублёр", cost: "0.25" },
  { name: "Попытка №2", cost: "0.25" },
  { name: "Кинжал", cost: "0.25" },
  { name: "Обмен карточками", cost: "0.25" },
  { name: "Обмен машинами", cost: "0.25" },
  { name: "Автолюбитель", cost: "0.25" },
  { name: "Детектив", cost: "0.25" },
  { name: "Пиромансер", cost: "0.25" },
  { name: "Авто-стоп", cost: "0.25" },
  { name: "Наручники", cost: "0.25" },
  { name: "Апгрейд", cost: "0.25" },
  { name: "Доп.баллы", cost: "0.25" },
  { name: "Иммунитет", cost: "0.25" },
  { name: "Зеркало", cost: "0.25" },
  { name: "Вампиризм", cost: "0.25" },
  { name: "Бронзовый ключ", cost: "0.25" },
];
</script>

<template>
  <section class="rule-page">
    <h2 class="title">Правила</h2>

    <nav class="nav">
      <h3 class="section-title">Содержание</h3>
      <ul class="list">
        <li class="list-item" v-for="{ id, text } in navItems" :key="id">
          <a class="list-item-link" :href="'#' + id"># {{ text }}</a>
        </li>
      </ul>
    </nav>

    <!-- Секция: Общее и Судья -->
    <section class="section" id="referee-general">
      <h3 class="section-title car">Общее и Судья</h3>
      <p class="text">
        Перед началом матча игроки договариваются, где ведется обсуждение
        действий: вживую, в голосовом или текстовом чате.
      </p>
      <p class="text">
        <strong>Роль Судьи:</strong> Один из игроков берет на себя роль «Судьи».
        Он играет наравне со всеми, но параллельно ведёт открытую статистику
        (фиксирует баллы, ключи и элитные карты игроков). Любой игрок может
        узнать статистику.
      </p>
      <p class="text text--important">
        <strong>Важно:</strong> обычные карточки и выпавшую машину должен знать
        только сам игрок. Всем видны только текущие баллы соперников и свои, их
        ключи и скрафченные элитные карточки.
      </p>
    </section>

    <!-- Секция: Дисциплины -->
    <section class="section" id="discipline">
      <h3 class="section-title discipline">Дисциплины:</h3>
      <p class="text">
        Существует всего {{ disciplines.length }} дисциплин. Дисциплину выбирает
        Судья или голосованием игроков перед началом
        <a class="highlighter" href="#modifier">рулетки выбора хода</a>, обычно
        в порядке по списку, но можно выбирать по желанию:
      </p>
      <p class="text important">
        <strong>Важно:</strong> Каждую дисциплину из списка можно выбрать только
        один раз. Повторный выбор допускается исключительно при разрешении
        спорных моментов.
      </p>
      <p class="text">Список дисциплин и задания для игроков:</p>
      <ul class="list">
        <li
          class="list-item"
          v-for="({ id, name, action }, index) in disciplines"
          :key="id"
        >
          {{ index + 1 }}. {{ name }} - {{ action }}
        </li>
      </ul>
    </section>

    <!-- Секция: Машины -->
    <section class="section" id="car">
      <h3 class="section-title car">Машины</h3>
      <p class="text">
        В начале раунда игрок получает 1 машину через рулетку на сайте. Выпавший
        транспорт используется в заезде, реролл запрещен.
      </p>
      <p class="text">
        Исключение: если активен
        <a class="highlighter" href="#card">модификатор</a>, игрок может
        получить 2 машины и 2 карточки вместо стандартных 1 машины и 1 карточки.
      </p>
      <p class="text">
        В списке у каждой машины указан класс (рейтинг): D, C, B, A, S, R, X (от
        начального до максимального). Также могут присутствовать следующие
        пометки:
      </p>
      <ul class="list">
        <li class="list-item">
          <strong>«Платная»</strong> - машину можно получить только если ты
          купил платный набор или за реальные деньги.
        </li>
        <li class="list-item">
          <strong>«Эксклюзив»</strong> - такую нельзя купить в автосалоне или на
          аукционе, её можно выбить только в спец. гонках или каким-то другим
          путём.
        </li>
      </ul>
    </section>

    <!-- Секция: Рулетка ходов и Карточки -->
    <section class="section" id="card">
      <h3 class="section-title card">Рулетка ходов и Карточки</h3>
      <p class="text">
        Перед заездом Судья запускает рулетку выбора хода, в которую входят все
        зарегистрированные игроки. Когда рулетка выбирает конретного игрока, он
        обязан выбрать одно из трех действий:
      </p>
      <ul class="list">
        <li class="list-item">1. Использовать карту (обычную или элитную).</li>
        <li class="list-item">2. Перекрутить рулетку (не выходя из нее).</li>
        <li class="list-item">
          3. Покинуть рулетку в текущем раунде (сохраняя карты, но становясь
          неуязвимым для воздействий до конца раунда).
        </li>
      </ul>
      <p class="text important">
        <strong>Важно:</strong> карточку можно использовать только в момент
        своего хода, когда тебя выбрала рулетка. Никак иначе! Все карточные
        действия совершаются до начала заезда. Как только все игроки сделали
        ходы и покинули рулетку - начинается заезд. Один и тот же игрок может
        выпадать многократно подряд - это зависит только от удачи и случайности
        рулетки.
      </p>
      <p class="text"><strong>Виды карточек:</strong></p>
      <ul class="list">
        <li class="list-item">
          <strong>«Buff (Усиление)»</strong> - положительные эффекты для себя.
        </li>
        <li class="list-item">
          <strong>«Debuff (Ослабление/Атака)»</strong> - негативные эффекты для
          соперника.
        </li>
        <li class="list-item">
          <strong>«Utility (Утилита/Механика)»</strong> - изменение правил игры,
          обмен, раскрытие информации, копирование (может быть как выгодным, так
          и рискованным).
        </li>
      </ul>
    </section>

    <!-- Секция: Игроки -->
    <section class="section" id="player">
      <h3 class="section-title player">Игроки</h3>
      <p class="text">
        <strong>Пример 1 - Атака:</strong> Игрок А применяет карту «Кинжал» к
        Игроку Б. Ход переходит к Игроку Б. Он может: отразить атаку картой
        «Зеркало» (при наличии); перекрутить рулетку (приняв урон); покинуть
        рулетку (приняв урон).<br />
      </p>
      <p class="text note">
        <strong>Примечание:</strong> «Урон» в данном контексте - синоним
        принятия негативного эффекта от атаки (например, потеря баллов,
        принудительный обмен машинами и т.д.). Игрок, покинувший рулетку, не
        может получить урон, так как не участвует в ней до конца раунда.
      </p>
      <p class="text">
        <strong>Пример 2 - Цепочка:</strong> Игрок А применяет карту «Апгрейд»
        (максимальный тюнинг, например, повышение класса машины с D до S1).
        Рулетка крутится заново. Выпасть может любой игрок, включая Игрока А.
        Цепочка ходов одного игрока продолжается до тех пор, пока: не выпадет
        другой игрок; не закончатся карты (игрок автоматически покидает
        рулетку); игрок сам не покинет рулетку; игроков не останется в рулетке.
      </p>
    </section>

    <!-- Секция: Баллы -->
    <section class="section" id="points">
      <h3 class="section-title player">Баллы</h3>
      <p class="text">
        Распределение баллов, зависит от количества игроков, но желательное
        минимальное количество 3-4 игрока. Базовое распределение, которое можно
        в любой момент поменять:
      </p>
      <ul class="list">
        <li class="list-item">1 место - 1 балл.</li>
        <li class="list-item">2 место - 0,75 балл.</li>
        <li class="list-item">3 место - 0,5 балл.</li>
        <li class="list-item">4 место - 0,25 балл.</li>
        <li class="list-item">5 место - 0,15 балл.</li>
        <li class="list-item">6 место - 0,1 балл.</li>
        <li class="list-item">7 место - 0,05 балл.</li>
      </ul>
      <p class="text important">
        <strong>Важно:</strong> независимо от того, сколько игроков участвует,
        игрок на последнем месте никогда не должен получать 0 баллов
        (минимальное допустимое 0,05 балла).
      </p>
    </section>

    <!-- Секция: Элитные карточки -->
    <section class="section" id="elite-card">
      <h3 class="section-title elite-card">Элитные карточки / Крафты</h3>
      <p class="text">
        Мощные и улучшенные карты, которые используются ограниченное количество
        раз либо действуют пассивно на весь матч.
      </p>
      <p class="text">
        <strong>Способы получения:</strong>
      </p>
      <ul class="list">
        <li class="list-item">
          <strong>«Крафт»</strong> - из обычных карт (в основном из 3-х).
        </li>
        <li class="list-item">
          <strong>«Ящик Пандоры»</strong> - есть шанс выбить оттуда Элитную
          карту, только с золотого ключа.
        </li>
      </ul>
      <p class="text note">
        <strong>Примечание:</strong> получить Элитную карточку из «Ящик Пандоры»
        можно только с помощью
        <a class="highlighter" href="#pandora">золотого ключа</a>.
      </p>
    </section>

    <!-- Секция: Ящик Пандоры -->
    <section class="section" id="pandora">
      <h3 class="section-title pandora">Ящик Пандоры</h3>
      <p class="text">Открывается с помощью ключей:</p>
      <ul class="list">
        <li class="list-item">
          <strong>«Бронзовый ключ»</strong> - большой шанс выбить очень плохой
          дроп, но маленький шанс выбить что-то стоящее.
        </li>
        <li class="list-item">
          <strong>«Серебряный ключ»</strong> - баланс, шанс выбить что хорошее и
          плохое равный.
        </li>
        <li class="list-item">
          <strong>«Золотой ключ»</strong> - гарантированно выдается хороший
          дроп.
        </li>
      </ul>
      <p class="text">
        <strong>Механика получения и обмена ключей:</strong>
      </p>
      <ul class="list">
        <li class="list-item">
          1 бронзовый ключ выдается игроку, занявшему последнее место в заезде.
        </li>
        <li class="list-item">
          В рулетке ходов наравне с игроками присутствует сектор «Бронзовый
          ключ». Если он выпадает, Судья делает следующий прокрут - и тот игрок,
          на которого укажет рулетка, забирает этот ключ себе (не более 1 раза
          за раунд).
        </li>
        <li class="list-item">
          Обмен ключей доступен только в момент своего хода в рулетке: 2
          бронзовых = 1 серебряный; 2 серебряных = 1 золотой.
        </li>
      </ul>
    </section>

    <!-- Секция: Модификаторы -->
    <section class="section" id="modifier">
      <h3 class="section-title modifier">Модификаторы</h3>
      <p class="text">
        Дополнительные условия и правила, действующие на протяжении всего матча.
        Выбираются перед игрой путем голосования или случайным образом через
        рулетку. Полный список модификаторов находится на отдельной странице.
      </p>
      <p class="text">
        <strong>Пример:</strong> «Симуляторные повреждения» - игроки включают на
        весь матч симуляторные повреждения. При столкновениях в гонках состояние
        машины ухудшается, что ведет к потере максимальной скорости,
        управляемости и другим техническим неисправностям.
      </p>
    </section>

    <!-- Секция: Магазин -->
    <section class="section" id="shop">
      <h3 class="section-title shop">Магазин</h3>
      <p class="text">
        Список товаров, которые можно купить за заработанные баллы. Стоимость
        большинства базовых товаров - 0,25 балла. При покупке за 0,25 балла
        название карты может не раскрываться (соперники видят лишь факт
        покупки). Уход в минус при покупке запрещен.
      </p>
      <p class="text important">
        <strong>Важно:</strong> игрок знает, какую карту купил, но не раскрывает
        её соперникам. Соперники видят только факт покупки (название карты
        остаётся скрытым). Раскрываются только: элитные карточки, количество
        баллов и ключей игрока.
      </p>
      <ul class="list shop">
        <li
          class="list-item"
          v-for="({ name, cost }, index) in purchasedItems"
          :key="index"
        >
          <strong>{{ name }}</strong> - {{ cost }} б.
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.rule-page {
  --font-size-title: clamp(1.5rem, 1.15rem + 1.45vw, 2.6rem);
  --font-size-text: clamp(0.5rem, 0.5rem + 1.5vw, 1rem);
}

a {
  color: var(--accent-neon);
}

.section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-radius: 5px;
}
.section:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-900);
}

.nav {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-radius: 5px;
}

.title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 700;
}

.section-title {
  font-size: 1.89rem;
  padding-bottom: 0.75rem;
  font-weight: 600;
}

.list {
  margin-top: 0.625rem;
  padding: 1rem;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius);
}

.text {
  font-size: var(--font-size-text);
  margin-bottom: 0.625rem;
  line-height: 1.5;
  margin-top: 0.3125rem;
}

.important {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  background-color: var(--important-bg);
  border-left: 0.25rem solid var(--important-border);
  border-radius: 0.25rem;
}
.text.note {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  background-color: var(--note-bg);
  border-left: 0.25rem solid var(--note-border);
  border-radius: 0.25rem;
}

/* Планшеты и мобильные устройства */
@media (max-width: 768px) {
  .section-title {
    text-align: center;
  }

  .text {
    text-align: justify;
  }
}
</style>
