import React from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import AssignmentItem from './AssignmentItem';
import { taskGraph } from '../../constants';

const AssignmentItems = ({
  taskStatus,
  assignments,
  assignmentsLoading,
  users,
  onEdit,
  onView,
  onSelect,
}) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {
      assignmentsLoading
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
              assignments.length > 0
                ?
                  <FlatList
                    data={assignments}
                    keyExtractor={assn => assn.assignedTo}
                    renderItem={({ item }) =>
                    (<AssignmentItem
                      disabled={taskStatus === taskGraph.V_TASK_COMPLETED}
                      item={{
                        ...item,
                        assignedTo: users[item.assignedTo].username,
                        assignedBy: users[item.assignedBy].username,
                      }}
                      onEdit={() => onEdit(item)}
                      onView={() => onView(item)}
                      onSelect={() => onSelect(item)}
                    />)
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
                    <Text>No assignments ;o</Text>
                  </View>
          }
          </View>
    }
  </View>
);

export default AssignmentItems;
