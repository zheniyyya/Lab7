export default function Header({ favoritesCount, total }) {
  return (
    <header className="header">
      <div className="header__bar">
        <a className="header__logo" href="/">
          <span className="header__logo-mark">Т</span>
          РепетиторUA
        </a>
        <nav className="header__nav">
          <a href="#catalog">Каталог</a>
          <a href="#how">Як це працює</a>
          <a href="#become">Стати репетитором</a>
        </nav>
        <span className="header__favorites" title="Обрані репетитори">
          ♥ {favoritesCount}
        </span>
      </div>
      <div className="hero">
        <img
          className="hero__image"
          src="/images/hero.png"
          alt="Учні на занятті з репетитором"
          width="2400"
          height="900"
        />
        <div className="hero__text">
          <h1>Знайдіть свого репетитора</h1>
          <p>
            {total.toLocaleString('uk-UA')} перевірених викладачів з усієї України. Онлайн і
            наживо, від першого класу до магістратури.
          </p>
        </div>
      </div>
    </header>
  );
}
