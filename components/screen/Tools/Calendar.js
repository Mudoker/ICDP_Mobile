import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const CalendarView = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState([]);

    // Set selected date
    const handleDayPress = (day) => {
        setSelected(day.dateString);
    };

    // Custom calendar header
    const renderHeader = (date) => {
        // Extract the month and year from the date object
        const month = date.toString('MMMM');
        const year = date.getFullYear().toString();

        // Customize the header as desired
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '500', color: '#222B45', fontFamily: 'SF UI Text' }}>{month}</Text>
                <Text style={{ fontSize: 14, color: '#8F9BB3', fontFamily: 'SF UI Text' }}>{year}</Text>
            </View>
        );
    };

    // Custom calendar arrow
    const renderArrow = (direction) => {
        // Customize arrow icon here
        const image = direction === 'left' ? require('../../../assets/images/arrow_left.png') : require('../../../assets/images/arrow_right.png');
        return (
            <Image
                source={image}
                style={{
                    width: 12,
                    height: 10
                }} />)
    }

    // Create new event on selected date
    const handleCreateEvent = () => {
        if (selected) {
            const newEvent = {
                date: selected,
                eventName: 'New Event',
                startTime: '8:00',
                author: 'admin',
            };
            setEvents([...events, newEvent]);
        } else {
            alert('Please select a date first');
        }
    };

    // Set color for dot base on event type
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

        // Add dot to current event date
        result[date].dots.push({
            key: result[date].dots.length,
            color: dotColor,
        });
        return result;
    }, {});

    // Format selected date string
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
                    // render custom components
                    renderHeader={renderHeader}
                    renderArrow={renderArrow}
                    onDayPress={handleDayPress}
                    markingType={'multi-dot'}
                    // load multi-dots for both selected and not selected date
                    markedDates={{
                        ...markedDates,
                        [selected]: {
                            ...markedDates[selected],
                            selected: true,
                        },
                    }}
                />
            </View>

            {/* Horizontal line */}
            <View style={{ height: 1, width: 1000, backgroundColor: 'grey', opacity: 0.5 }}></View>

            {/* Event list */}
            <View style={{ flex: 1, marginTop: 5, marginLeft: 10 }}>

                {/* Display selected date */}
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'SF UI Text',
                        color: '#8F9BB3',
                        fontWeight: 600,
                        marginBottom: 5,
                    }}
                >
                    {formattedDate}
                </Text>

                {/* Display message if no event for selected date */}
                {selected && events.filter((event) => event.date === selected).length === 0 && (
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <Image style={{ height: 50, width: 50, marginBottom: 40 }} source={require('../../../assets/images/smiley.png')} />
                        <Text style={{ color: '#857979', fontSize: 14, opacity: 0.7, fontFamily: 'SF UI Text' }}>Vui lòng chọn icon ở dưới để thêm kế hoạch cho ngày này</Text>
                    </View>
                )}

                {/* Display event list */}
                <View style={{ flex: 1, rowGap: 3 }}>

                    {/* Sort events by time */}
                    {events.length > 0 && events.sort((a, b) => {
                        const [hoursA, minutesA] = a.startTime.split(':');
                        const [hoursB, minutesB] = b.startTime.split(':');
                        const timeA = parseFloat(hoursA) + parseFloat(minutesA) / 60;
                        const timeB = parseFloat(hoursB) + parseFloat(minutesB) / 60;
                        return timeA - timeB;
                    }).map((event, index) => {
                        // Display event if it matches selected date
                        if (event.date === selected) {
                            return (
                                <TouchableOpacity key={index} style={{ flexDirection: 'row' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={{ color: '#000', fontWeight: 700, fontSize: 16, fontFamily: 'SF UI Text' }}>{event.startTime} </Text>
                                    </View>
                                    <View style={{ height: 35, width: 5, borderRadius: 15, backgroundColor: handleColor(event.eventName), marginLeft: 5 }}></View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={{ color: '#000', fontWeight: 800, fontSize: 14, fontFamily: 'SF UI Text', height: 16, marginLeft: 10 }}>{event.eventName}</Text>
                                        <Text style={{ textDecorationLine: 'underline', color: '#857979', fontSize: 14, fontFamily: 'SF UI Text', marginLeft: 10 }}>{event.author}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })}

                </View>

                {/* Hanle create new event */}
                <TouchableOpacity
                    onPress={handleCreateEvent}
                    style={{
                        backgroundColor: '#496CF1',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                >
                    <Image source={require('../../../assets/images/plus_sign.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CalendarView;
