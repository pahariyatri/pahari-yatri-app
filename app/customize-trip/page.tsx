import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";

export default function CustomizeTrip() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-bold mb-6">Join Us on Your Next Adventure</h2>
      <p className="text-lg leading-relaxed mb-8">
        Embark on an adventure with <strong>Pahari Yatri</strong> and discover the hidden treasures of the Himalayas. Let’s create unforgettable memories together while respecting and preserving our environment. Whether you are seeking a challenging trek or a peaceful retreat, Pahari Yatri offers a diverse range of experiences that cater to all adventure enthusiasts.
      </p>
      <Button className="mt-6 px-6 py-3 font-bold rounded-lg transition duration-300">
        Start Your Adventure
      </Button>
    </SectionContainer>
  );
}
