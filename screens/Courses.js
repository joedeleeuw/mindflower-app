import React from 'react';
import {  Text, TouchableOpacity, FlatList } from 'react-native';
import { courses } from '../mocks';

export function CoursesScreen({ navigation }) {
  return (
    <FlatList
      data={courses}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { title: item.title })}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

export function CourseDetailScreen({ route }) {
  return <Text>{route.params.title}</Text>;
}
