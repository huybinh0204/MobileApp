import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import strings from "_localization";
import { SecondaryScreenLayout } from "_components/organisms";
import styled from "@emotion/native";

const WebViewScreen = () => {
  return (
    <SecondaryScreenLayout title={strings.forgotPassword.title} testID="WebViewScreen">
      <Content style={{}}>
        <Text>Binh</Text>
        <Text>Check View </Text>
      </Content>
    </SecondaryScreenLayout>
  );
};

export default WebViewScreen;

export const Content = styled.View(({ theme }) => (console.log("----",theme.spacing.m),{
  flex: 1,
  padding: theme.spacing.m,
}));
