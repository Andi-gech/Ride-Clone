import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Custom date format (e.g., "YYYY-MM-DD")
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View>
      <DateTimePicker
        value={selectedDate}
        mode="time"
        
    
    
        display="spinner"

        is24Hour={true}
            onChange={handleDateChange}
      />
      {/* Display the selected date in custom format */}
      <Text>Selected Date: {formatDate(selectedDate)}</Text>
    </View>
  );
};

export default DateTimePickers;
