import requeteAJAX from "./httpRequest";
const Portfolio = {

    changerHeightDesProjets: function() {
        var hauteurEcran = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var largeurEcran = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var lesProjets = document.getElementsByClassName("projet")
        for (var i = 0; i < lesProjets.length; i++) {
            if (hauteurEcran > largeurEcran) {
                lesProjets[i].style.maxHeight = hauteurEcran + "px";
                lesProjets[i].style.minHeight = largeurEcran + "px";
            } else {
                lesProjets[i].style.maxHeight = largeurEcran + "px";
                lesProjets[i].style.minHeight = hauteurEcran + "px";
            }
        }
    },

    afficherMessageSucces: function() {
        var leForm = document.getElementsByTagName("form")[0];
        var succesDiv = document.getElementsByClassName("msgEnvoie")[0];
        if (this.emailData.mailSent === true) {
            leForm.style.display = "none";
            succesDiv.style.display = "flex";
        } else {
            leForm.style.display = "block";
            succesDiv.style.display = "none";
        }
    },

    emailData: {
        nom: null,
        email: null,
        message: null,
        mailSent: false,
        getEmailInfo: function() {
            this.nom = document.getElementsByName("user_name")[0].value;
            this.email = document.getElementsByName("user_mail")[0].value;
            this.message = document.getElementsByName("user_message")[0].value;
            return {nom: this.nom, email: this.email, message: this.message}
        },
        resetMailData: function() {
            this.nom = null;
            this.email = null;
            this.message = null;
            document.getElementsByName("user_name")[0].value = "";
            document.getElementsByName("user_mail")[0].value = "";
            document.getElementsByName("user_message")[0].value = "";
        }
    },

    sendMailRequest: function() {
        requeteAJAX("POST", "/contact", this.emailData.getEmailInfo()).then(() => {
            this.emailData.mailSent = true;
            this.afficherMessageSucces();
        })
    },

    sendNewMail: function() {
        this.emailData.mailSent = false;
        this.emailData.resetMailData();
        this.afficherMessageSucces();
    },

    addEmailListener: function() {
        document.getElementsByTagName("button")[0].addEventListener("click", this.sendMailRequest.bind(this), false);
        document.getElementsByClassName("autreMsg")[0].addEventListener("click", this.sendNewMail.bind(this), false)
    },

    init: function() {
        this.changerHeightDesProjets();
        this.addEmailListener();
    }
};

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    },
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-96998999-1', 'auto');
ga('send', 'pageview');

(function() {
    Portfolio.init();
})();
