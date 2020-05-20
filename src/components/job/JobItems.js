import React from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import JobItem from './JobItem';

const JobItems = ({
  jobs,
  jobsLoading,
  onView,
  onSelect,
}) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {
      jobsLoading
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
            jobs.length > 0
              ?
                <FlatList
                  data={jobs}
                  keyExtractor={job => job._id}
                  renderItem={({ item }) => (
                    <JobItem
                      item={item}
                      onView={() => onView(item)}
                      onSelect={() => onSelect(item)}
                    />
                  )}
                />
              :
                <View
                  style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <Text>No jobs ;o</Text>
                </View>
          }
          </View>
    }
  </View>
);

export default JobItems;
