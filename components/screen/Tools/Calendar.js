import React, { useState, useEffect } from 'react';
import { Calendar, DotMarking } from 'react-native-calendars';
import { Button, View, Text, TouchableOpacity } from 'react-native';

const CalendarView = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState([]);

    const handleDayPress = (day) => {
        setSelected(day.dateString);
    };

    const handleCreateEvent = () => {
        if (selected) {
            const newEvent = {
                date: selected,
                eventName: 'New Event',
                startTime: '12:00',
                author: 'admin',
            };
            setEvents([...events, newEvent]);
        } else {
            alert('Please select a date first');
        }
    };

    const handleColor = (eventName) => {
        if (eventName === 'OLT') {
            return 'purple';
        } else if (eventName === 'HW') {
            return 'green';
        } else if (eventName === 'Reboot POP') {
            return 'orange';
        } else {
            return 'lightblue';
        }
    }
    // Loop through events and create marked dates with dots
    const markedDates = events.reduce((result, event) => {
        // Get the event date
        const { date } = event;

        // If no event for this date, create one
        if (!result[date]) {
            result[date] = {
                dots: [],
                marked: true,
                selected: false,
                selectedColor: '#735BF2',
            };
        }

        // Set color for dot base on event type
        let dotColor = handleColor(event.eventName);
        let tool = '';
        if (event.eventName === 'OLT') {
            tool = 'OLT';
        } else if (event.eventName === 'HW') {
            tool = 'HW';
        } else if (event.eventName === 'Reboot POP') {
            tool = 'Reboot POP';
        } else {
            tool = 'Other';
        }

        // Add dot to event date
        result[date].dots.push({
            key: tool + result[date].dots.length,
            color: dotColor,
        });
        return result;
    }, {});

    const formattedDate = selected
        ? new Date(selected).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '';

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
                <Calendar
                    // Calendar theme
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#735BF2',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#735BF2',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                    }}
                    onDayPress={handleDayPress}
                    markingType={'multi-dot'}
                    markedDates={{
                        ...markedDates,
                        [selected]: {
                            ...markedDates[selected],
                            selected: true,
                        },
                    }}
                />
            </View>
            <View style={{ height: 1, width: 1000, backgroundColor: 'grey', opacity: 0.5 }}></View>
            <View style={{ flex: 1, padding: 20 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'SF UI Text',
                        color: '#8F9BB3',
                        fontWeight: '600',
                        marginTop: 10,
                    }}
                >
                    {formattedDate}
                </Text>
                <View style={{ flex: 1, rowGap: 20 }}>
                    {events.map((event, index) => {
                        if (event.date === selected) {
                            return (
                                <TouchableOpacity key={index} style={{ flexDirection: 'row' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text> {event.startTime} </Text>
                                    </View>
                                    <View style={{ height: 27, width: 3, backgroundColor: handleColor(event.eventName) }}></View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text> {event.eventName}</Text>
                                        <Text> {event.author}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>
                <TouchableOpacity
                    onPress={handleCreateEvent}
                    style={{
                        backgroundColor: '#496CF1',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{ color: 'white', fontSize: 24, fontFamily: 'SFProDisplay-Thin' }}
                    >
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CalendarView;
