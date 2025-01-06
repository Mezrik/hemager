import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

export const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>
        <Trans>404 - Not Found</Trans>
      </h1>
      <p>
        <Trans>Sorry, the page you are looking for does not exist.</Trans>
      </p>
      <Button asChild variant="link">
        <Link to="/" replace>
          <Trans>Go to Home</Trans>
        </Link>
      </Button>
    </div>
  );
};
