import TaskStack from '../tasks';
import JobStack from '../admin/jobs';

export const standardRoutes = {
  Tasks: {
    screen: TaskStack,
  },
};

export const adminRoutes = {
  Jobs: {
    screen: JobStack,
  },
  ...standardRoutes,
};
