import React from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import TaskItem from './TaskItem';

const TaskItems =
  ({
    tasks,
    tasksLoading,
    user,
    users,
    onView,
    onSelect,
    onActivity,
  }) => (
    <View
      style={{
        flex: 1,
      }}
    >
      {
        tasksLoading
          ?
            <View
              style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <ActivityIndicator
                size="large"
              />
            </View>
          :
            <View
              style={{
              flex: 1,
            }}
            >
              {
                tasks.length > 0
                  ?
                    <FlatList
                      data={tasks}
                      keyExtractor={task => task._id}
                      renderItem={({ item }) => {
                          const assignment = item.assignments
                            ? item.assignments.find(x => x.assignedTo === user._id) : {};

                          return (
                            <TaskItem
                              item={item}
                              user={user}
                              users={users}
                              assignmentStatus={assignment ? assignment.status : ''}
                              onView={() => onView(item)}
                              onSelect={() => onSelect(item)}
                              onActivity={status => onActivity(item._id, status)}
                            />
                          );
                        }
                      }
                    />
                  :
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text>No tasks ;o</Text>
                    </View>
              }
            </View>
      }
    </View>
  );

export default TaskItems;
