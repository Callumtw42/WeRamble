import React, { useState, useEffect } from 'react'
import {ip, port} from "../utils"
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Button
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt.js";
import {user} from "../../entity/user";
import {input} from "../modules/register_check"
import {auth} from "../middle/auth";
import {log} from "../middle/log";
import {sendEmail} from "../util/sendEmail";
import {createUrl} from "../util/createUrl";

@Resolver()
export class RegisterResolver {

    @UseMiddleware(auth, log)
    @Mutation(() => user)
    async register(@Arg("data")
    {
      email,
      firstName,
      lastName,
      password
    }: input): Promise<user> {
     
        const hashedPassword = await bcrypt.hash(password, 12);

        const new_user = await user.create({

            firstName,
            lastName,
            email,
            password: hashedPassword
      }).save();


      await sendEmail(email, await createUrl(user.id));
     

      return  (
        <View>
            <Text>E-Mail</Text>
            <Button
                title="Register"
                onPress={() => new_user}
            />
        </View>
    );
    } 
}

export default function change({ navigation }) {


    return (

        <View>
            <Text>Move to login</Text>
            <Button
                title="login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
    
}


const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
});
