import FeaturedModels from "../../components/homepage/FeaturedModels";

export default function Models() {
  return (
    <div>
      <div className="sticky top-0 z-10 h-[53px] flex justify-between border-b">
        <div className="content-center px-4">
          <h1 className="text-xl font-semibold">Model</h1>
        </div>
      </div>
      <FeaturedModels />
    </div>
  );
}
