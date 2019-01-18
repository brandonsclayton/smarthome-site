
const d3 = require('d3');
const axios = require('axios');

const Devices = require('lib/Devices');
const Footer = require('lib/Footer');
const Header = require('lib/Header');
const Tools = require('lib/Tools');
const Spinner = require('lib/Spinner');

class Dashboard {

  constructor() {
    this.spinner = new Spinner();
    this.footer = new Footer();
    this.header = new Header();
    this.header.setTitle("Dashboard");
    this.devices = new Devices();

    this.el = document.querySelector("#content");;
    this.tempStatusEl = this.el.querySelector("#temperature-status");
    this.avgTempEl = this.el.querySelector("#average-temp");
    this.livingRoomTempEl = this.el.querySelector("#living-room-temp");
    this.bedroomTempEl = this.el.querySelector("#bedroom-temp");
    this.tempOuterEl = this.tempStatusEl.querySelector(".outer-panel");

    this.tempStatsEl = this.el.querySelector('#temperature-stats');
    this.meanTempEl = this.tempStatsEl.querySelector('#mean');
    this.minTempEl = this.tempStatsEl.querySelector('#min');
    this.maxTempEl = this.tempStatsEl.querySelector('#max');
    this.statsRoomSelectEl = this.tempStatsEl.querySelector('#room-select');
   
    let apiUrl = 'https://clayton-smarthome-ws.herokuapp.com/';

    this.getLastMessageUrl = apiUrl + 
        '/getLastMessage?devicegroup=temperature&count=1';
  
    this.getTemperatureStatsUrl = apiUrl + 
        '/getLastMessageStats?device=temperature&days=1';

    this.getMessages();
    
    // this.webSocketUrl = 'ws://' + this.baseUrl + '/getLiveMessage';

    // let tempWebSocket = this.getLiveMessage(
    //   this.devices.temperature.id,
    //   this.setTemperaturePanel);
    
    // document.addEventListener("visibilitychange", (event) => {
    //   if (document.hidden) {
    //     console.log('Hidden')
    //     tempWebSocket.close();
    //   } else {
    //     console.log('Visible');
    //     this.getLastMessage();

    //     tempWebSocket = this.getLiveMessage(
    //       this.devices.temperature.id,
    //       this.setTemperaturePanel);

    //   }
    // });
  }

  getMessages() {
    let statsCall = axios.get(this.getTemperatureStatsUrl);
    let messageCall = axios.get(this.getLastMessageUrl);
    this.spinner.on(messageCall.reject);

    Promise.all([ messageCall, statsCall ]).then((result) => {
      this.spinner.off();
      this.setTemperaturePanel(result[0].data);
      this.setStatSelectMenu(result[1].data);
      this.showCards();
    }).catch((errorMessage) => {
      try {
        throw new Error(errorMessage);
      } catch(err) {
        console.error(errorMessage);
      }
    });
  }

  // getLiveMessage(device, callback) {
  //   let url = this.webSocketUrl + '?device=' + device;
  //   let ws = new WebSocket(url);

  //   ws.onopen = () => {
  //     console.log('Web sockets connected to ' + device);
  //   };

  //   ws.onclose = () => {
  //     console.log('Web sockets closed ' + device);
  //   }

  //   ws.onerror = () => {
  //     console.log('Websockets Error for ' + device)
  //   };

  //   ws.onmessage = (response) => {
  //     let data = JSON.parse(response.data);
  //     let status = data.status;

  //     if (status == 'success') {
  //       console.log('Web Sockets On Message:');
  //       console.log(data);
  //       this._liveCallback = callback;
  //       this._liveCallback(data.response);
  //     } 
  //   };

  //   return ws;
  // }

  setTemperaturePanel(result) {
    let tempResponse = result.response.find((response) => {
      return response.device.id == 'temperature';
    });

    for (let dataGroup of tempResponse.dataGroup) {
      d3.select(this.tempStatusEl)
          .select('#' + dataGroup.deviceField.id)
          .html(dataGroup.data[0].toFixed(2) + '℉ '); 
    }

    d3.select(this.tempStatusEl)
        .select('.panel-footer')
        .text('Last Updated: ' + tempResponse.date[0]);
  }

  setStatsPanel(result, deviceField) {
    let avgResponse = result.response.find((response) => {
      return response.deviceField.id == deviceField; 
    });

    d3.select(this.meanTempEl)
        .html(avgResponse.mean + '℉')
    
    d3.select(this.minTempEl)
        .html(avgResponse.min + '℉')
    
    d3.select(this.maxTempEl)
        .html(avgResponse.max + '℉')
    
    d3.select(this.tempStatsEl)
        .select('.panel-footer')
        .text('Last Updated: ' + result.date);
  }

  setStatSelectMenu(result) {
    d3.select(this.statsRoomSelectEl)
        .selectAll('option')
        .data(result.response)
        .enter()
        .append('option')
        .attr('value', (d) => { return d.deviceField.id; })
        .text((d) => { return d.deviceField.label; });
    
    let defaultValue = 'Average_Temperature';
    this.statsRoomSelectEl.value = defaultValue;
    this.setStatsPanel(result, defaultValue);

    this.statsRoomSelectEl.addEventListener('change',() => { 
      this.onRoomChange(result); 
    });

  }

  onRoomChange(result) {
    let value = event.target.value;
    this.setStatsPanel(result, value);
  }

  showCards() {
    d3.select(this.tempStatusEl)
        .classed('hidden', false);

    d3.select(this.tempStatsEl)
        .classed('hidden', false);
  }

}

new Dashboard();
