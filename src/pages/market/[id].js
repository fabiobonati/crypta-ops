import { useRouter } from 'next/router';

const MarketPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Page of {id}</h1>
    </div>
  );
};

export default MarketPage;
