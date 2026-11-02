const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// 1. إعداد البوت واستدعاء الصلاحيات
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ]
});

// 2. البيانات المهمة (استبدل القيم دي ببياناتك)
const GUILD_ID = '1094908019176910940';
const CHANNEL_ID = '1408521646859354358';
const BOT_TOKEN = 'MTU2NjYzMDIwMDkxNjMyMDMzNw.G2fnMa.gt3UxFo_Ng5AXIAEpU8HOxYGila6nFyhGzsib4';

// 3. لما البوت يفتح ويشتغل
client.once('ready', () => {
    console.log(` تم تسجيل الدخول بنجاح بحساب: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return console.log(" السيرفر مش موجود أو البوت مش مقترن بيه!");

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) return console.log(" روم الفويس مش موجودة!");

    // دخول روم الفويس والثبات فيها
    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false, // ما يعملش Mute لنفسه
        selfMute: true   // يفضل صامت عشان ما ينقلش أي دوشة
    });

    console.log(" البوت دخل روم الفويس وهيفضل قاعد فيها على طول!");
});

// 4. حماية البوت (لو خرج من الفويس أو اتفصل لأي سبب، يرجع يدخل تاني تلقائياً)
client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.id === client.user.id && !newState.channelId) {
        console.log(" البوت خرج من الفويس، جاري إعادة الاتصال خلال 5 ثواني...");
        setTimeout(() => {
            const guild = client.guilds.cache.get(GUILD_ID);
            const channel = guild.channels.cache.get(CHANNEL_ID);
            if (guild && channel) {
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator,
                    selfDeaf: false,
                    selfMute: true
                });
            }
        }, 5000);
    }
});

// 5. تشغيل البوت
client.login(BOT_TOKEN);