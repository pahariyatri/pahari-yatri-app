import SectionContainer from "@/components/common/SectionContainer";

export default function About() {
  return (
    <SectionContainer>
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('/static/images/pahari-yatri-banner.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white text-center">About Us</h1>
        </div>
      </div>
      <div className="p-8">
        <section className="my-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Welcome to Pahari Yatri</h2>
          <p className="text-lg leading-relaxed">
            <strong>Pahari Yatri</strong> is your ultimate gateway to the best treks in Himachal Pradesh. Our focus is on safety, sustainability, and creating personalized experiences for every adventurer. Whether you’re exploring the hidden gem treks of Himachal or embarking on peaceful trekking routes, join us to discover the untouched treasures of the Himalayas.
          </p>
        </section>
        <section className="my-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Turning Treks into Himalayan Yatras</h2>
          <p className="text-lg leading-relaxed">
            At <strong>Pahari Yatri</strong>, we transform ordinary treks into extraordinary <strong>Himalayan Yatras</strong>. A &quot;Yatra&quot; in our context is not just a journey; it&rsquo;s a pilgrimage, a transformative voyage. Experience guided trekking tours in Himachal where every trek, from the Triund trek to the Pin Parvati Pass trek, becomes an expedition of self-discovery and wonder.
          </p>
        </section>
        <section className="my-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Commitment</h2>
          <ul className="list-disc list-inside text-lg leading-relaxed inline-block text-left">
            <li><strong>Safety:</strong> Your safety is our utmost priority. Each trek, whether it&rsquo;s the Hampta Pass trek or the Chanderkhani Pass trek, is meticulously planned and led by experienced professionals who are well-versed in the terrains of the Himalayas.</li>
            <li><strong>Sustainability:</strong> We are deeply committed to preserving the natural beauty of the Himalayas. Our trekking practices are environmentally friendly, ensuring minimal impact on the pristine landscapes we explore.</li>
            <li><strong>Personalized Experiences:</strong> We understand that every traveler is unique. From affordable trekking tours in Himachal to custom trekking tours, we tailor our treks to meet your specific preferences and needs, ensuring a personalized and memorable journey for each participant.</li>
          </ul>
          <p className="text-lg leading-relaxed mt-6">
            These guiding principles ensure that every expedition not only respects the environment but also supports local communities, creating a positive and sustainable impact.
          </p>
        </section>
        {/* <section className="my-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us on Your Next Adventure</h2>
          <p className="text-lg leading-relaxed mb-8">
            Embark on an adventure with <strong>Pahari Yatri</strong> and discover the hidden treasures of the Himalayas. Let’s create unforgettable memories together while respecting and preserving our environment. Whether you are seeking a challenging trek or a peaceful retreat, Pahari Yatri offers a diverse range of experiences that cater to all adventure enthusiasts.
          </p>
          <Button className="mt-6 px-6 py-3 font-bold rounded-lg transition duration-300">
            Start Your Adventure
          </Button>
        </section> */}
      </div>
    </SectionContainer>
  );
}
