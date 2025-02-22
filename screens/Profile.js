import React, {useState} from 'react';
import { useTheme } from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Modal,
  Linking,
} from 'react-native';

const CompanyProfile = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const images = {
    'mobilesaid.jpeg': require('../src/img/mobilesaid.jpeg'),
    'mobileadhit.jpeg': require('../src/img/mobileadhit.jpeg'),
    'novea.jpg': require('../src/img/novea.jpg'),
    'upay.jpg': require('../src/img/upay.jpg'),
    'taufik.jpg': require('../src/img/taufik.jpg'),
    'faizz.jpg': require('../src/img/faizz.jpg'),
  };


  const companyData = {
    name: 'Novea',
    logo: 'novea.jpg',
    description:
      'Novea berasal dari dua kata, "Nova" yang berarti baru, segar, dan penuh energi, serta "Era," yang mencerminkan masa kini dan masa depan yang terus berubah. Gabungan ini menunjukkan aplikasi berita yang menyajikan informasi terkini, relevan, dan inovatif yang mencerminkan perubahan dan perkembangan zaman.',
    address: 'Jl. Novea No. 123, Bandung',
    phone: '+62 96 7500 6525',
    email: 'novea@trusted.id',
    Instagram: 'novea.id',
  };


  const teamMembers = [
    {
      id: 1,
      name: 'Said Aqim Wijhatalillah',
      position: '17223004',
      image: 'mobilesaid.jpeg',
      bio: 'Seorang Mahasiswa semester 5 di Universitas Adhirajasa Reswara Sanjaya, jurusan Teknik Informatika, Fakultas Teknologi Informasi.',
      email: 'said.aqm@novea.id',
      Instagram: 'https://www.instagram.com/saiidaqm?igsh=MTZ6ajhqYXVpcWZqeg==',

      expertise: ['AI/ML', 'Cloud Computing'],
    },
    {
      id: 2,
      name: 'M Faiz Priyantoro',
      position: '17223028',

      image: 'faizz.jpg',
      bio: 'Seorang Mahasiswa semester 5 di Universitas Adhirajasa Reswara Sanjaya, jurusan Teknik Informatika, Fakultas Teknologi Informasi.',
      email: 'faiz.priyantoro@novea.id',
      Instagram:
        'https://www.instagram.com/mhmmdfaizp?igsh=MXd3MGcwc28xdzM4aQ==',

      expertise: ['AI/ML', 'Cloud Computing'],
    },
    {
      id: 3,
      name: 'Adhitya Rahadiansyah',
      position: '17223010',
      image: 'mobileadhit.jpeg',
      bio: 'Seorang Mahasiswa semester 5 di Universitas Adhirajasa Reswara Sanjaya, jurusan Teknik Informatika, Fakultas Teknologi Informasi.',
      email: 'adhitya.rahadiansyah@novea.id',
      Instagram:
        'https://www.instagram.com/adhitya_rh?igsh=MW5uODd6Z2wzeXBmZw==',

      expertise: ['Product Strategy', 'UX Design'],
    },
    {
      id: 4,
      name: 'Lutfhi Muayyad Billah',
      position: '17223011',

      image: 'upay.jpg',
      bio: 'Seorang Mahasiswa semester 5 di Universitas Adhirajasa Reswara Sanjaya, jurusan Teknik Informatika, Fakultas Teknologi Informasi.',
      email: 'lutfhi.mb@novea.id',
      Instagram: 'https://www.instagram.com/upa4y?igsh=MTJ6NDEwcHY4Y2g1eg==',
      expertise: ['Product Strategy', 'UX Design'],
    },
    {
      id: 5,
      name: 'M Taufik Faturrohman',
      position: '17223017',

      image: 'taufik.jpg',
      bio: 'Seorang Mahasiswa semester 5 di Universitas Adhirajasa Reswara Sanjaya, jurusan Teknik Informatika, Fakultas Teknologi Informasi.',
      email: 'adhitya.rahadiansyah@novea.id',
      Instagram:
        'https://www.instagram.com/faturrahman_moch?igsh=a2phdHg5dXJlc3Bo',

      expertise: ['Product Strategy', 'UX Design'],
    },
  ];

  const MemberModal = ({member, visible, onClose}) => {
    if (!member) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Image
              source={images[member.image]}
              style={styles.modalImage}
              resizeMode="cover"
            />

            <Text style={styles.modalName}>{member.name}</Text>
            <Text style={styles.modalPosition}>{member.position}</Text>

            <Text style={styles.modalBioTitle}>Tentang</Text>
            <Text style={styles.modalBio}>{member.bio}</Text>

            <Text style={styles.modalExpertiseTitle}>Keahlian</Text>
            <View style={styles.expertiseContainer}>
              {member.expertise.map((skill, index) => (
                <View key={index} style={styles.expertiseTag}>
                  <Text style={styles.expertiseText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.contactButtons}>
            <TouchableOpacity
                style={styles.contactButton}
                onPress={() => Linking.openURL(`mailto:${member.email}`)}>
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactButton, styles.InstagramButton]}
                onPress={() => Linking.openURL(member.Instagram)}>
                <Text style={styles.contactButtonText}>Instagram</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const TeamMemberCard = ({member}) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          setSelectedMember(member);
          setModalVisible(true);
        }}
        activeOpacity={0.9}>
        <Animated.View
          style={[
            styles.memberCard,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <Image
            source={images[member.image]}
            style={styles.memberImage}
            resizeMode="cover"
          />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberPosition}>{member.position}</Text>
            <Text style={styles.memberPreview}>Tap untuk detail</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Company Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={images[companyData.logo]}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>{companyData.name}</Text>
      </View>

      {/* Company Description Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tentang Kami</Text>
        <Text style={styles.description}>{companyData.description}</Text>
      </View>

      {/* Company Contact Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Kontak</Text>
        <Text style={styles.contactInfo}>Alamat: {companyData.address}</Text>
        <Text style={styles.contactInfo}>Telepon: {companyData.phone}</Text>
        <Text style={styles.contactInfo}>Email: {companyData.email}</Text>
        <Text style={styles.contactInfo}>
          Instagram: {companyData.Instagram}
        </Text>
      </View>

      {/* Team Members Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tim Kami</Text>
        <View style={styles.teamContainer}>
          {teamMembers.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </View>
      </View>

      <MemberModal
        member={selectedMember}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedMember(null);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular', 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  memberCard: {
    width: Dimensions.get('window').width / 2 - 30,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  memberImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  memberInfo: {
    padding: 12,
    backgroundColor: '#fff',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberPosition: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  memberPreview: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalPosition: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  modalBioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  modalBio: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  modalExpertiseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  expertiseTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 4,
  },
  expertiseText: {
    fontSize: 14,
    color: '#444',
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  contactButton: {

    backgroundColor: '#0056b3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  InstagramButton: {

    backgroundColor: '#0056b3',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompanyProfile;