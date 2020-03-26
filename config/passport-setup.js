const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

const SpotifyStrategy = require('passport-spotify').Strategy;
const SlackStrategy = require("passport-slack").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id); // A piece of info and save it to cookies
});

 passport.deserializeUser((id, done)=>
    {
        //Who's id is this?
        User.query(`SELECT row_to_json (u) FROM ( SELECT "oauth".findById('${id}') AS "user") u`,(err,res)=>
        {
            if(err)
            {

            }
            else
            {
                const user = res.rows[0].row_to_json.user;
                console.log(user);
                done(null, user); 
            }        
        });
    });
passport.use(
    new LinkedInStrategy(
        {
            clientID: keys.linkedin.clientID,
            clientSecret: keys.linkedin.clientSecret,
            callbackURL: '/auth/linkedin/callback'
        },
        function (token, tokenSecret, profile, done) {

            let image = profile.photos;
            if (image.length > 0) {
                image = profile.photos.url;
            }
            else {
                image = 'https://komarketing.com/images/2014/08/linkedin-default.png';
            }

            User.query(
                `CALL "oauth".insertIfUnique('${profile.id}', '${profile.displayName}', '${image}')`,
                (err, res) => {
                    const _user =
                    {
                        id: profile.id,
                        name: profile.displayName,
                        picture: image
                    };

                    if (err) {
                        const currentUser = _user;
                        done(null, currentUser);
                    }
                    else {
                        const newUser = _user;
                        done(null, newUser);
                    }
                });



        }
    ));
passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our database
        console.log('###########VIEWING###############');
        console.log(profile);

        // const sql1 = `select count(*) as result from "oauth".user where id=${profile.id}`;
        // User.query(sql1,(err,res)=>{
        //     console.log(`>>>>>>>>>>>>>> res = ${JSON.stringify(res)}`)
        //     console.log(`>>>>>>>>>>>>>> result = ${res.rows[0].result}`)
        //     if(res.rows[0].result==0 && res.rows[0].result!=undefined){
        //         const sql2 = `INSERT INTO "oauth".user 
        //         VALUES( ${profile.id},
        //                 '${profile.displayName}',
        //                 ${profile.photos[0].value})`;
        //         User.query(sql2,(err1, res1)=>{
        //             if(err1) User.end();
        //             console.log("##############");
        //             console.log("User has been successfully inserted!");
        //             console.log(sql2);
        //             User.end();
        //         });
        //         console.log("User inserted!");
        //     }else{
        //         console.log("User has been already inserted!");
        //     }            
        // });

        User.query(`CALL "oauth".insertifunique('${profile.id}',
                                                    '${profile.displayName}',
                                                    '${profile.photos[0].value}')`,
            (err, res) => {
                console.log(">>>>>>>>>>>>>>>>>>>>>>");
                const _user = {
                    id: profile.id,
                    name: profile.displayName,
                    picture: profile.photos[0].value
                };

                if (err) {
                    //already have the user
                    const currentUser = _user;
                    console.log('User is ', JSON.stringify(currentUser));
                    done(null, currentUser);
                    //console.log(err);
                } else {
                    //if not, new user was created in our db
                    const newUser = _user;
                    console.log('New User created: ' + JSON.stringify(newUser));
                    done(null, newUser);
                    // console.log(res.rows[0]);
                }
            });


    })
);
passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify.clientID,
            clientSecret: keys.spotify.clientSecret,
            callbackURL: '/auth/spotify/callback'
        },
        (accessToken, refreshToken, expires_in, profile, done) => {

            let image = profile._json.images;
            if (image.length > 0) {
                image = profile._json.images.url;
            }
            else {
                image = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png';
            }

            User.query(
                `CALL "oauth".insertIfUnique('${profile.id}', '${profile.displayName}', '${image}')`,
                (err, res) => {
                    const _user =
                    {
                        id: profile.id,
                        name: profile.displayName,
                        picture: image
                    };

                    if (err) {
                        const currentUser = _user;
                        done(null, currentUser);
                    }
                    else {
                        const newUser = _user;
                        done(null, newUser);
                    }
                });
        }
    ));



passport.use(
    new GitHubStrategy(
        {
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            callbackURL: "/auth/github/callback"
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(profile);
            User.query(
                `CALL "oauth".insertIfUnique('${profile.id}', '${profile.username}', '${profile.photos[0].value}')`,
                (err, res) => {
                    const _user =
                    {
                        id: profile.id,
                        name: profile.displayName,
                        picture: profile.photos[0].value
                    };

                    if (err) {
                        const currentUser = _user;
                        cb(null, currentUser);
                    }
                    else {
                        const newUser = _user;
                        cb(null, newUser);
                    }
                }
            );
        }
    )
);

passport.use(
    new SlackStrategy(
        {
            clientID: keys.slack.clientID,
            clientSecret: keys.slack.clientSecret,
            callbackURL: '/auth/slack/callback'
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
console.log(profile);
         

            User.query(
                `CALL "oauth".insertIfUnique('${profile.user.id}', '${profile.user.name}', '${profile.user.image_72}')`,
                (err, res) => {
                    const _user =
                    {
                        id: profile.user.id,
                        name: profile.user.name,
                        picture: profile.user.image_72
                    };

                    if (err) {
                        const currentUser = _user;
                        done(null, currentUser);
                    }
                    else {
                        const newUser = _user;
                        done(null, newUser);
                    }
                });
        }
    ));

