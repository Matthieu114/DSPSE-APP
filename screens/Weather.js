import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import requestbody from '../test.json';
import colors from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  FontAwesome5,
  Fontisto,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { CustomText } from '../Components/CustomText';
import { format } from 'date-fns';

const API_KEY = 'c056d8aba4ab4de6b5692009220404';

const ForecastWidget = ({
  image,
  chanceOfRain,
  time,
  tempCel,
  windSpeed,
  windDir
}) => {
  let newTime;

  if (time.slice(11).charAt(0) === '0') newTime = time.slice(12);
  else newTime = time.slice(11);

  return (
    <LinearGradient
      colors={[colors.blue400, colors.blue200, colors.blue400]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingBottom: 25,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
      }}>
      <View>
        <CustomText color='white' fontWeight='bold' fontSize={20}>
          {newTime}
        </CustomText>
      </View>
      <Image
        style={{ width: 40, height: 40, paddingRight: 10 }}
        source={{
          uri: 'https:' + image
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomText color='white' fontWeight='500'>
          {chanceOfRain}% rain
        </CustomText>
      </View>
      <CustomText color='white' fontWeight='bold'>
        {windDir}
      </CustomText>
      <CustomText color='white' fontWeight='bold'>
        {windSpeed} km/h
      </CustomText>
      <CustomText color='white' fontWeight='bold'>
        {tempCel}°
      </CustomText>
    </LinearGradient>
  );
};

const Weather = () => {
  const [result, setResult] = useState('');
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(async () => {
    const WEATHER_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=auto:ip&aqi=yes`;
    const FORECAST_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=auto:ip&aqi=yes&days=1`;
    const weatherResponse = await axios.get(WEATHER_URL);
    const forecastResponse = await axios.get(FORECAST_URL);

    setCurrentWeather({
      location: weatherResponse?.data?.location.name,
      country: weatherResponse?.data?.location.country,
      image: weatherResponse?.data?.current?.condition.icon,
      condition: weatherResponse?.data?.current?.condition.text,
      temperatureCel: weatherResponse?.data.current.temp_c,
      temperatureFar: weatherResponse?.data.current.temp_f,
      humidity: weatherResponse?.data.current.humidity,
      windSpeedKph: weatherResponse?.data.current.wind_kph,
      windSpeedMph: weatherResponse?.data.current.wind_mph,
      windDirection: weatherResponse?.data.current.wind_dir,
      rafalesMph: weatherResponse?.data.current.gust_mph,
      rafalesKph: weatherResponse?.data.current.gust_kph,
      visibiliteKm: weatherResponse?.data.current.vis_km,
      visibiliteMiles: weatherResponse?.data.current.vis_miles
    });

    setForecast(
      forecastResponse?.data?.forecast.forecastday[0].hour.map((item) => {
        return {
          time: item.time,
          temperatureCel: item.temp_c,
          temperatureFar: item.temp_f,
          image: item.condition.icon,
          windSpeedKph: item.wind_kph,
          windSpeedMph: item.wind_mph,
          windDirection: item.wind_dir,
          precipitmm: item.precip_mm,
          precipitin: item.precip_in,
          feelslikeC: item.feelslike_c,
          feelslikeFar: item.feelslike_f,
          chanceOfRain: item.chance_of_rain,
          windDirection: item.wind_dir
        };
      })
    );
  }, []);

  return (
    <LinearGradient
      style={styles.primaryBackground}
      colors={[colors.primaryTransparent20p, colors.blue400, colors.blue200]}>
      <LinearGradient
        colors={[
          colors.lightGreyTransparent,
          colors.greyTransparent,
          colors.lightGreyTransparent
        ]}
        style={styles.primaryInfoBox}>
        {/* top row info */}
        <View style={styles.topRowInfo}>
          <Ionicons name='add' size={25} color='white' />
          <CustomText color='white' fontWeight='500' fontSize={15}>
            {currentWeather?.location}, {currentWeather?.country}
          </CustomText>
          <Ionicons name='ellipsis-vertical' size={24} color='white' />
        </View>
        {/* Middle row info */}
        <View style={styles.middleRowInfo}>
          <Image
            style={{ width: 125, height: 125 }}
            source={{
              uri: 'https:' + currentWeather.image
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <CustomText color='white' fontWeight='400' fontSize={15}>
                {format(new Date(), 'eeee')}{' '}
                <Text style={{ fontWeight: '600' }}> | </Text>{' '}
                {format(new Date(), 'MMM dd')}
              </CustomText>
            </View>
            <CustomText color='white' fontWeight='500' fontSize={80}>
              {currentWeather.temperatureCel}
              <Text style={{ fontWeight: '200', fontSize: 40 }}>°</Text>
            </CustomText>
            <CustomText color='white' fontWeight='400' fontSize={25}>
              {currentWeather.condition}
            </CustomText>
          </View>
        </View>
        {/* Seperation Line */}
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            marginTop: 25
          }}
        />

        <View style={styles.parentAdditionalInfoContainer}>
          <View style={styles.additionnalInfoContainer}>
            <View style={styles.additionnalInfoBox}>
              <MaterialCommunityIcons
                name='wind-turbine'
                size={26}
                color='white'
              />
              <View style={styles.smallInfoContainerPadding}>
                <CustomText color='white' fontWeight='500' fontSize={13}>
                  {currentWeather.windSpeedKph} km/h
                </CustomText>
                <CustomText color='white' fontWeight='400' fontSize={13}>
                  Wind Speed
                </CustomText>
              </View>
            </View>
            <View style={styles.additionnalInfoBox}>
              <FontAwesome name='location-arrow' size={26} color='white' />
              <View style={styles.smallInfoContainerPadding}>
                <CustomText color='white' fontWeight='500' fontSize={13}>
                  {currentWeather.windDirection}
                </CustomText>
                <CustomText color='white' fontWeight='400' fontSize={13}>
                  Wind Direction
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.additionnalInfoContainer}>
            <View style={styles.additionnalInfoBox}>
              <Ionicons name='eye-outline' size={26} color='white' />
              <View style={styles.smallInfoContainerPadding}>
                <CustomText color='white' fontWeight='500' fontSize={13}>
                  {currentWeather.visibiliteKm} km
                </CustomText>
                <CustomText color='white' fontWeight='400' fontSize={13}>
                  Visibility
                </CustomText>
              </View>
            </View>
            <View style={styles.additionnalInfoBox}>
              <Fontisto name='wind' size={26} color='white' />
              <View style={styles.smallInfoContainerPadding}>
                <CustomText color='white' fontWeight='500' fontSize={13}>
                  {currentWeather.rafalesKph} km/h
                </CustomText>
                <CustomText color='white' fontWeight='400' fontSize={13}>
                  Wind Gusts
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={{ marginTop: 25, paddingLeft: 15, paddingRight: 10 }}>
        <View style={{ alignItems: 'left' }}>
          <CustomText color='white' fontWeight='400' fontSize={25}>
            {format(new Date(), 'eeee')}{' '}
            <Text style={{ fontWeight: '600' }}> | </Text>{' '}
            {format(new Date(), 'MMM dd')}
          </CustomText>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20
          }}>
          <CustomText>Time</CustomText>
          <CustomText>Time</CustomText>
          <CustomText>Time</CustomText>
          <CustomText>Time</CustomText>
        </View> */}
      </View>
      <ScrollView style={styles.forecastContainer}>
        {forecast?.map((item, key) => {
          return (
            <ForecastWidget
              key={key}
              time={item.time}
              tempCel={item.temperatureCel}
              image={item.image}
              windSpeed={item.windSpeedKph}
              windDir={item.windDirection}
              chanceOfRain={item.chanceOfRain}
            />
          );
        })}

        {/* <View>
          {weatherData?.data?.forecast.forecastday[0].hour.map((item) => {
            return <Text>{JSON.stringify(item, null, 3)}</Text>;
          })}
        </View> */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  primaryBackground: {
    flex: 1,
    paddingTop: 50
  },
  forecastContainer: {
    marginTop: 10
  },
  primaryInfoBox: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 15,
    borderRadius: 25
  },

  topRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  middleRowInfo: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  parentAdditionalInfoContainer: {
    flexDirection: 'row'
  },
  additionnalInfoContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
  additionnalInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  smallInfoContainerPadding: {
    paddingLeft: 7
  }
});

export default Weather;
