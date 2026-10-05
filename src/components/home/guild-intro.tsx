const GuildIntro = () => {
  return (
    <section aria-labelledby="guild-intro-heading" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-dawn-gold text-sm font-medium tracking-[0.2em]">
          BLUE DAWN
        </p>
        <h1
          id="guild-intro-heading"
          className="text-dawn-sky text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          蔚藍天際
        </h1>
        <p className="text-sakura-700 text-sm">迪恩伺服器</p>
      </div>
    </section>
  );
};

export { GuildIntro };
