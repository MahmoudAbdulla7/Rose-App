import Banner from './banner';
import Occasions from './occasions';

export default function Hero() {
  return (
    <section className="my-10 text-white">
      <div className="mx-auto max-w-11/12 space-y-6">
        <Banner />
        <Occasions />
      </div>
    </section>
  );
}
