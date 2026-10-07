import Image from "next/image";

import { CONTACT_NOTE, RECRUIT_FORM_URL, images } from "#/constants/home";

const HomeJoin = () => {
  return (
    <section className="sec join" id="join">
      <h2 style={{ marginBottom: "1rem" }}>來飛一圈吧</h2>
      <p className="lead">伺服器：迪恩。輕鬆遊玩，溫馨愉快，在蔚藍天際與你相遇。</p>
      <a
        className="poster"
        href={RECRUIT_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          sizes="1200px"
          src={images.poster.src}
          width={images.poster.width}
          height={images.poster.height}
          alt={images.poster.alt}
        />
      </a>
      <div className="ways">
        <article>
          <h3>直接申請加入公會</h3>
          <p>在遊戲內找到「蔚藍天際」（伺服器：迪恩），送出入會申請就可以了。</p>
        </article>
        <article>
          <h3>填寫招募表單</h3>
          <p>想先聊聊再決定？留下角色名稱與聯絡方式就好。</p>
          <a
            className="cta"
            href={RECRUIT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            填寫招募表單
          </a>
        </article>
      </div>
      <p className="note">{CONTACT_NOTE}</p>
    </section>
  );
};

export { HomeJoin };
