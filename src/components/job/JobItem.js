import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const JobItem = ({
  item: {
    title,
    description,
    category,
    component,
    totalTasks,
    completedTasks,
    pending,
  },
  onView,
  onSelect,
}) => (
  <TouchableOpacity
    onLongPress={pending ? null : onSelect}
    onPress={onView}
    delayPressIn={50}
  >
    <Card
      containerStyle={{
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        ...(pending ? { backgroundColor: 'rgba(225, 225, 225, 0.3)' } : {}),
      }}
    >
      {
        pending
        &&
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      }
      <View
        style={{
          justifyContent: 'space-between',
          ...(pending ? { opacity: 0.3 } : {}),
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
        <View
          style={{
            marginBottom: 15,
          }}
        >
          {
            description
              ?
                <Text
                  style={{
                  fontSize: 14,
                }}
                >
                  {description}
                </Text>
              :
                <Text
                  style={{
                  fontSize: 14,
                  fontStyle: 'italic',
                }}
                >
                This job has no description.
                </Text>
          }
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconMCI name="bookmark" size={25} />
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {category}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconMCI name="chip" size={25} />
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {component}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconMCI name="clipboard-check" size={25} />
              {
                totalTasks > 0
                  ?
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 3,
                      }}
                    >
                      {completedTasks}/{totalTasks} tasks completed
                    </Text>
                  :
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 3,
                      }}
                    >
                    no tasks
                    </Text>
              }
            </View>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

export default JobItem;
