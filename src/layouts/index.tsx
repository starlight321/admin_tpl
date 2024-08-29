import { Outlet } from '@umijs/max';
import { memo } from 'react';

export default memo(() => {
  return (
    <div>
      <Outlet />
    </div>
  );
});
