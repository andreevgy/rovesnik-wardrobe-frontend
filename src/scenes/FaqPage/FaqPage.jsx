import Button from "../../components/Button";

const FaqPage = () => {
    return <div className="page">
        <h2>Забронируй номерок в гардеробе Ровесника</h2>
        <br />
        <h2>Как это работает?</h2>
        <h3>1. Отдай куртку в гардероб и получи номерок</h3>
        <h3>2. Отсканируй QR-код на обратной стороне номерка</h3>
        <h3>3. Оставь нам свою почту и "закрепи" номерок за собой</h3>
        <h3>4. Когда захочешь покурить, покажи номерок и экран телефона - это подтверждение что ты никуда не убежишь</h3>
        <h3>5. Вернувшись, отдай куртку без очереди</h3>
        <h3>6. Когда окончательно соберешься домой, отдай номерок и открепи его в приложении</h3>
        <br />
        <Button link="/">Обратно на главную</Button>
        <br />
        <h2>Зачем это нужно?</h2>
        <h3>Это не нужно</h3>
        <h3>Это приложение сделано по приколу за два вечера, чтобы предложить концепт неудобного решения несуществующей проблемы</h3>
        <p>P.S.: Все права на логотип и название принадлежат команде бара Ровесник</p>
        <p>Приложение является прототипом, который при более глубоком изучении, скорее всего, не имеет смысла</p>
        <p>Однако, я считаю что Ровеснику нужно свое приложение/сайт, для еще большего удобства посетителей и друзей! (и у меня есть пара более полезных идей)</p>
        <br />
        <small>andreevgy</small>
        <small><a className="link" href="https://www.instagram.com/andreevgy/">inst</a></small>
        <small><a className="link" href="http://t.me/andreevgy/">telegram</a></small>
    </div>
}

export default FaqPage;