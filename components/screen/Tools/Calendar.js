import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, Button, Image, Modal, TextInput, PanResponder, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const CalendarView = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState([]);
    const [eventSelectionModal, seteventSelectionModal] = useState(false);
    const [eventDetailModal, seteventDetailModal] = useState(false);
    const [modalHeight, setModalHeight] = useState(200); // Initial height of the modal
    const [panResponder, setPanResponder] = useState(null);
    const [isBaotriOpen, setBaoTriOpen] = useState(false);
    const [isTKOpen, setTKOpen] = useState(false);
    const [isDiDoiOpen, setDiDoiOpen] = useState(false);
    const [isThayTheOpen, setThayTheOpen] = useState(false);
    const [chosenEvent, setChosenEvent] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleFormSubmit = () => {
        // Perform form submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        // Reset form fields
        setName('');
        setEmail('');
    };
    const toggleBaoTriDropdown = () => {
        setBaoTriOpen(!isBaotriOpen);
    };

    const toggleTKDropdown = () => {
        setTKOpen(!isTKOpen);
    };

    const toggleDiDoiDropdown = () => {
        setDiDoiOpen(!isDiDoiOpen);
    }

    const toggleThayTheDropdown = () => {
        setThayTheOpen(!isThayTheOpen);
    }

    const addPlanModal = (eventName) => {
        console.log(eventName);
        seteventSelectionModal(false);
        seteventDetailModal(true);
    }
    useEffect(() => {
        const createPanResponder = () => {
            const responder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    setScrollViewEnabled(false);
                },
                onPanResponderMove: (_, gestureState) => {
                    if (gestureState.dy > 0) {
                        setModalHeight(200 + gestureState.dy); // Adjust the height based on gesture
                    }
                },
                onPanResponderRelease: () => {
                    // Reset the height to the initial value when the gesture is released
                    setModalHeight(200);
                },
            });
            setPanResponder(responder);
        };

        createPanResponder();
    }, []);
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
        seteventSelectionModal(true);
    };

    // Handle option selection in the modal
    const handleOptionSelect = (option) => {
        const newEvent = {
            date: selected,
            eventName: option,
            startTime: '8:00',
            author: 'admin',
        };
        setEvents([...events, newEvent]);
        seteventSelectionModal(false);
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
                {/* Modal */}
                <Modal
                    visible={eventSelectionModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => seteventSelectionModal(false)}
                >
                    <TouchableWithoutFeedback onPress={() => seteventSelectionModal(false)}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={{ backgroundColor: '#fff', padding: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderColor: 'grey', borderWidth: 3 }}>
                                    <ScrollView style={{ maxHeight: 700, minHeight: 400 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ backgroundColor: 'grey', width: 66, height: 5, borderRadius: 10, marginBottom: 5 }}></View>
                                            <Text style={{ fontSize: 20, color: 'black', fontFamily: 'SF UI Text', fontWeight: 600 }}>
                                                Add New Plan
                                            </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                style={[styles.menuItem, styles.dropdownItem]}
                                                onPress={toggleBaoTriDropdown}
                                            >
                                                <View style={styles.dropdownHeader}>
                                                    <View style={styles.bannerTextContainer}>
                                                        <Image source={require('../../../assets/images/baotri_icon.png')} style={styles.iconImage} />
                                                        <Text style={styles.menuItemText}>Bảo Trì</Text>
                                                    </View>
                                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                                </View>
                                                {isBaotriOpen && (
                                                    <View style={styles.dropdownContent}>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Reboot POP")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Reboot POP</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.menuItem, styles.dropdownItem]}
                                                onPress={toggleTKDropdown}
                                            >
                                                <View style={styles.dropdownHeader}>
                                                    <View style={styles.bannerTextContainer}>
                                                        <Image source={require('../../../assets/images/tk_icon.png')} style={styles.iconImage} />
                                                        <Text style={styles.menuItemText}>Triển khai mới</Text>
                                                    </View>
                                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                                </View>
                                                {isTKOpen && (
                                                    <View style={styles.dropdownContent}>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Cấu hình OLT mới")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Cấu hình OLT mới</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Cấu hình POP mới")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Cấu hình POP mới</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("UP SWITCH FTI")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> UP SWITCH FTI</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Cấu hình SW CE")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Cấu hình SW CE</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.menuItem, styles.dropdownItem]}
                                                onPress={() => addPlanModal("Di dời")}
                                            >
                                                <View style={styles.dropdownHeader}>
                                                    <View style={styles.bannerTextContainer}>
                                                        <Image source={require('../../../assets/images/didoi_icon.png')} style={styles.iconImage} />
                                                        <Text style={styles.menuItemText}>Di dời</Text>
                                                    </View>
                                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.menuItem, styles.dropdownItem]}
                                                onPress={toggleThayTheDropdown}
                                            >
                                                <View style={styles.dropdownHeader}>
                                                    <View style={styles.bannerTextContainer}>
                                                        <Image source={require('../../../assets/images/thaythe_icon.png')} style={styles.iconImage} />
                                                        <Text style={styles.menuItemText}>Thay thế</Text>
                                                    </View>
                                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                                </View>
                                                {isThayTheOpen && (
                                                    <View style={styles.dropdownContent}>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Thay thế SW CE")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Thay thế SW CE</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => addPlanModal("Thay thế OLT")}>
                                                            <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                            <Text style={styles.dropdownMenuItemText}> Thay thế OLT</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                        {/* Add more options as needed */}
                                    </ScrollView>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Modal
                    visible={eventDetailModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => seteventDetailModal(false)}
                >
                    <TouchableWithoutFeedback onPress={() => seteventDetailModal(false)}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={{ backgroundColor: '#fff', padding: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderColor: 'grey', borderWidth: 3 }}>
                                    <ScrollView style={{ maxHeight: 700, minHeight: 400 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ backgroundColor: 'grey', width: 66, height: 5, borderRadius: 10, marginBottom: 5 }}></View>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, color: 'black', fontFamily: 'SF UI Text', fontWeight: 400, marginRight: 40 }}>
                                                    Khai báo thông tin
                                                </Text>
                                                <Text style={{ fontSize: 14, color: 'black', fontFamily: 'SF UI Text', fontWeight: 400 }}>
                                                    Chọn thiết bị
                                                </Text>

                                                {/* <View style={{ flexDirection: 'column' }}>
                                                    <View style={{ alignItems: 'flex-end    ' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            
                                                            
                                                        </View>
                                                    </View>
                                                </View> */}
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 25,
                                                    borderWidth: 2,
                                                    borderColor: 'lightgreen',
                                                    borderStyle: 'solid',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        width: 7, height: 14, color: 'lightgreen', marginTop: 10
                                                    }}>1</Text>
                                                </View>
                                                <View style={{
                                                    width: 100,
                                                    borderWidth: 1,
                                                    borderColor: 'lightgreen',
                                                    borderStyle: 'solid',
                                                    alignSelf: 'center',
                                                }} />
                                                <View style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 25,
                                                    borderWidth: 2,
                                                    borderColor: '#857979',
                                                    borderStyle: 'solid',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        width: 7, height: 14, color: '#857979', marginTop: 10
                                                    }}>2</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, padding: 20 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Form Example</Text>
                                                <Text style={{ marginBottom: 5 }}>Name:</Text>
                                                <TextInput
                                                    style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginBottom: 10 }}
                                                    value={name}
                                                    onChangeText={setName}
                                                />
                                                <Text style={{ marginBottom: 5 }}>Email:</Text>
                                                <TextInput
                                                    style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginBottom: 10 }}
                                                    value={email}
                                                    onChangeText={setEmail}
                                                />
                                                <Button title="Submit" onPress={handleFormSubmit} />
                                            </View>
                                        </View>

                                        {/* Add more options as needed */}
                                    </ScrollView>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#6C56F5',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        height: '100%',
        backgroundColor: 'rgb(253, 249, 255)',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderRightColor: 'rgb(232, 223, 236)',
        borderRightWidth: 1
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomColor: 'rgb(232, 223, 236)',
        borderBottomWidth: 0.8,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: 5
    },
    menuItemText: {
        fontSize: 16,
        paddingLeft: 8
    },
    banner: {
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        width: 240,
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 15,
    },
    bannerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconImage: {
        marginRight: 5,
    },
    bannerText: {
        fontSize: 13,
        color: 'white',
        fontWeight: '800',
        letterSpacing: 0.455,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
    },
    dropdownItem: {
        position: 'relative',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownContent: {
        paddingVertical: 10,
        borderTopWidth: 0.8,
        borderTopColor: '#CCCCCC',
        // borderTopColor: 'rgb(232, 223, 236)'
    },
    dropdownMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dropdownMenuItemText: {
        fontSize: 16,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerImage: {
        width: 181,
        height: 63,
        flexShrink: 0,
    },
    footNote: {
        fontSize: 10,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
        fontWeight: '500',
        letterSpacing: 0.35,
        color: 'white',
    },
});
export default CalendarView;
