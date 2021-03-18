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
import bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {input} from "components/src/modules/user/register_check"
import {auth} from "components/src/modules/middle/auth";
import {log} from "components/src/modules/middle/log";
import {sendEmail} from "components/src/modules/util/sendEmail";
import {createUrl} from "components/src/modules/util/createUrl";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

@Resolver()
export class RegisterResolver {

    @UseMiddleware(auth, log)
    @Mutation(() => User)
    async register(@Arg("data")
    {
      email,
      firstName,
      lastName,
      password
    }: input): Promise<User> {
     
        const hashedPassword = await bcrypt.hash(password, 12);

        const new_user = await User.create({

            firstName,
            lastName,
            email,
            password: hashedPassword
      }).save();


      await sendEmail(email, await createUrl(User.id));
      
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

<Popup
trigger={open => (
  <button className="button">Move to Login - {open ? 'Opened' : 'Closed'}</button>
)}
position="right center"
closeOnDocumentClick
>
<span> You have been sent an email to confirm your email address. Please click the link before trying to log in!! </span>
</Popup>;

export default function change({ navigation }) {

    return (

        <View>
            <Text>Login</Text>
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
