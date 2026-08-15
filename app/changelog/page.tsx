import { ComingSoon } from "@/components/primitives/ComingSoon";

export const metadata = {
  title: "Changelog",
  description: "What's new in Feluda—features, improvements, and fixes.",
};

export default function ChangelogPage() {
  return (
    <ComingSoon
      eyebrow="RESOURCES / CHANGELOG"
      title="Feluda changelog"
      description="A running log of releases, new capabilities, and notable improvements to the Feluda platform."
    />
  );
}