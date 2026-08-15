import { ComingSoon } from "@/components/primitives/ComingSoon";

export const metadata = {
  title: "Trust Center",
  description:
    "Documentation on Feluda's security, privacy, and compliance posture.",
};

export default function TrustCenterPage() {
  return (
    <ComingSoon
      eyebrow="RESOURCES / TRUST CENTER"
      title="Feluda trust center"
      description="A consolidated view of Feluda's security, privacy, and compliance posture—with documents available on request."
    />
  );
}