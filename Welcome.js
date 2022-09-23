import React, { useEffect, useRef, useState } from 'react';
import {Animated, Dimensions, ScrollView, StyleSheet, Text, View, Modal, Button} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
const { width, height } = Dimensions.get('window');
const itemWidth = width / 5 * 4.5;
const itemHeight = height / 3 * 2.2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;

const data = ['#f44336', 'orange', '#e91e63', 'red'];

export default function Welcome() {
const [mod, setMod] = useState(true);
const [activeIndex, setActiveIndex] = useState({ current: 0, previous: null })
    const scale = useRef(new Animated.Value(0)).current;
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        animate();
    }, [])
    useEffect(() => {
        animate();
    }, [activeIndex])
    const animate = () => {
        scale.setValue(0);
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 0.1, bounciness: 500 }).start();
    }
    const onScroll = (e) => {
        const x = e.nativeEvent.contentOffset.x;
        let newIndex = Math.floor((x / itemWidth) + 0.5)
        if (activeIndex.current != newIndex) {
            setActiveIndex({ current: newIndex, previous: activeIndex.current })
        }
    }
    return (
      <Modal visible={mod}>
        <View style={styles.container}>
            {data.map((x, i) => (
                <Animated.View key={x} style={[styles.bgColor, {
                    zIndex: i == activeIndex.current ? 0 : (i == activeIndex.previous ? -1 : -2),
                    backgroundColor: x,
                    transform: [{ scale: i == activeIndex.current ? scale : 1 }]
                }]} />
            ))}
            <View style={styles.container} />
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate="fast"
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                snapToInterval={offset}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                    listener: onScroll
                })}>
                {info.map((x, i) => (
                    <Item key={i} info={x} i={i} scrollX={scrollX} setMod={setMod}/>
                ))}
        <Button title="Get Started" onPress={()=>setMod(false)}/>
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {info.map((x, i) => (
                    <View key={x} style={[styles.indicator, i == activeIndex.current && { backgroundColor: '#fff' }]} />
                ))}
            </View>
        </View>
      </Modal>
    );
}
const info = ['Welcome to The Help', 'Here we teach and guide people to efectively learn.','While learning ,one may also carry on to develop robust projects.',"Can't wait?, Swipe left and get started." ]
function Item({ i, info, scrollX}) {
    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.9, 1, 0.9],
    });
    return <Animated.View style={[styles.item, { transform: [{ scale }] }]}>

      <Text style={styles.info}>{info}</Text>
        <ActivityIndicator size='large'/>
    </Animated.View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info:{
      color:'#000000',
      fontWeight:'bold',
      fontSize:15,
      marginHorizontal:20
    },
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
        paddingVertical: 10,
        zIndex: 1
    },
    item: {
        height: itemHeight,
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    bgColor: {
        position: 'absolute',
        height: height,
        width: height,
        borderRadius: height,
    },
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#444'
    }
});
