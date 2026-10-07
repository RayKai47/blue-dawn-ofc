import { MANIFESTO } from "#/constants/home";

const HomeManifesto = () => {
  return (
    <section className="pin mani" id="about">
      <div className="stick">
        <h2 id="mani" aria-label={MANIFESTO}>
          {[...MANIFESTO].map((char, index) => (
            <span key={index} aria-hidden="true">{char}</span>
          ))}
        </h2>
        <p>
          回應女神的呼喚、沿著靈魂之流來到愛爾琳（Erinn）之後，米列希安並不孤單。
          蔚藍天際 Blue Dawn 是願意在營火旁把步伐放慢的一群人。
          地下城裡或許會偶遇，原野上或許只是擦肩；生活各自修、職業也能換著玩，
          只要你還願意回來，這片天都在。
        </p>
      </div>
    </section>
  );
};

export { HomeManifesto };
