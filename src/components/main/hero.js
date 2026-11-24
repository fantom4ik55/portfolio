import Social from "./social";
import Steck from "./steck";

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">
        <span className="hero__title-line">Портфолио</span>
        <span className="hero__title-line hero__title-line--outline">WEB</span>
        <span className="hero__title-line hero__title-line--gradient">
          Разработчика
        </span>
      </h1>

      <div className="hero__info">
        <div className="hero__info-item">
          <h3 className="hero__info-title">Обо мне</h3>
          <p className="hero__info-text">
            Меня зовут Алексей. Превращаю идеи в интерактивные веб-интерфейсы с
            характером.
          </p>
        </div>

        <div className="hero__info-item-steck">
          <h3 className="hero__info-title">Стек</h3>
          <div className="hero__info-text">
            <Steck/>
            </div>
          <a
            className="hero__info-title"
            href="https://dev.1c-bitrix.ru/learning/resume.php?ID=83447633-8913574"
            target="_blank"
            rel="noopener noreferrer"
          >
            Сертификаты 1C-Битрикс
          </a>
        </div>

        <div className="hero__info-item">
          <h3 className="hero__info-title">Доступен</h3>
          <p className="hero__info-text">
            Для фриланс-проектов и сотрудничества
          </p>
        </div>
      </div>

      <Social/>
       
    </section>
  );
}

export default Hero;