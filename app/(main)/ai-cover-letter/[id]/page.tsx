const CoverLetter = async ({ params }) => {
  const id = await params.id;
  return <div className="">cover:{id}</div>;
};

export default CoverLetter;
