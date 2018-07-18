import TaskStack from '../tasks';
import JobStack from '../jobs';

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
