// eslint-disable-next-line
import * as React from 'react';
import './App.css';
import { Component } from 'react';
import MapGL from '@goongmaps/goong-map-react';
import { Marker, Popup } from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = 'M0RuPmc6vXp20YVRhLCHx8vFheFmj3luHN4oAkfq';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 16.0544,
                longitude: 108.2022,
                zoom: 5.5,
                bearing: 0,
                pitch: 0
            },
            selectedLocation: null
        };
    }


    render() {
        const locations = [
            { address: 'thành phố Hà Nội', latitude: 21.4337, longitude: 105.172, status: 'ACTIVE' },
            { address: 'thành phố Bắc Giang', latitude: 21.5841, longitude: 105.807, status: 'INACTIVE' },
            { address: 'thành phố Thái Nguyên', latitude: 21.594223, longitude: 105.848741, status: 'ACTIVE' },
            { address: 'thành phố Hồ Chí Minh', latitude: 10.8230989, longitude: 106.6296638, status: 'ACTIVE' },
            { address: 'quận Tây Hồ, Hà Nội', latitude: 21.08, longitude: 104.78, status: 'ERROR' },
            { address: 'Cao Kì, Bắc Kan', latitude: 22.0, longitude: 106.0, status: 'ERROR' },
            { address: 'Nguyên Bình, Cao bằng', latitude: 22.6, longitude: 105.9, status: 'ACTIVE' },
            { address: 'Sơn Động, Bắc Giang', latitude: 21.2, longitude: 106.7, status: 'ACTIVE' },
            { address: 'huyện Tam Nông, Phú thọ', latitude: 21.3, longitude: 105.2, status: 'ACTIVE' },
            { address: 'Trùng Khánh, Cao Bằng', latitude: 22.9, longitude: 106.5, status: 'ACTIVE' }
        ];

        const markers = locations.map(location => (
            <Marker
                key={location.address}
                longitude={location.longitude}
                latitude={location.latitude}
                onClick={() => this.setState({ selectedLocation: location })}

            >
                <div className="position-relative">
                    <img
                        src={
                            location.status === 'ACTIVE' ? 'pin-02.png' :
                                location.status === 'ERROR' ? 'pin.png' :
                                    'pin-inactive.png'
                        }
                        className={location.status === 'ERROR' ? 'error circle' : ''}
                        alt={location.address} width={20} height={20} style={{ cursor: 'pointer' }} />
                </div>
            </Marker>
        ));
        return (
            <>
                <MapGL
                    {...this.state.viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                    onViewportChange={viewport => this.setState({ viewport })}
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                >
                    {markers}
                    {this.state.selectedLocation && (
                        <Popup
                            latitude={this.state.selectedLocation.latitude}
                            longitude={this.state.selectedLocation.longitude}
                            onClose={() => this.setState({ selectedLocation: null })}
                        >
                            <div>
                                <h4>Địa chỉ: {this.state.selectedLocation.address}</h4>
                                <h5>Trạng thái: {this.state.selectedLocation.status}</h5>
                            </div>
                        </Popup>
                    )}
                </MapGL>
                <div className="note-list">
                    <p>Chú thích trạng thái</p>
                    <ul>
                        <li><img src='pin.png' alt='note' width={20} height={20} ></img><span>Cảnh báo lỗi</span></li>
                        <li><img src='pin-inactive.png' alt='note' width={20} height={20} ></img><span>Đang xử lý lỗi</span></li>
                        <li><img src='pin-02.png' alt='note' width={20} height={20} ></img><span>Hoạt động bình thường</span></li>
                    </ul>
                </div>
                <div className="marker-list">
                    <h3>Danh sách điểm</h3>
                    <ul>
                        {locations.map(location => (
                            <li key={location.address}>
                                {location.address} - {location.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
}

export default Map;