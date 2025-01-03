import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);

  const teamMembers = [
    {
      name: 'SAID AQIM WIJHATALILLAH',
      id: '17223004',
      image: './assets/img/mobilesaid.jpeg',
    },
    {
      name: 'MUHAMMAD FAIZ PRIYANTORO',
      id: '17223028',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'ADHITYA RAHADIANSYAH',
      id: '17221014',
      image: './assets/img/mobileadhit.jpeg',
    },
    {
      name: 'LUTFHI MUAYYAD BILLAH',
      id: '17223011',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'MOCHAMMAD TAUFIK FATURROHMAN',
      id: '17223017',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const openModal = member => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMember(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Informasi Perusahaan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tentang Novea</Text>
        <Text style={styles.text}>
          Novea berasal dari dua kata, "Nova" yang berarti baru, segar, dan
          penuh energi, serta "Era" yang mencerminkan masa kini dan masa depan
          yang terus berubah. Novea merupakan aplikasi berita yang menyajikan
          informasi terkini, relevan, dan inovatif yang mencerminkan perubahan
          dan perkembangan zaman.
        </Text>
      </View>

      {/* Struktur Organisasi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>

        {teamMembers.map((member, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={800}
            delay={index * 200}
            style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touchable}
              onPress={() => openModal(member)}>
              <Image source={{uri: member.image}} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{member.name}</Text>
              <Text style={styles.cardText}>{member.id}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>

      {/* Modal untuk Detail Anggota Tim */}
      {selectedMember && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Image
                source={{uri: selectedMember.image}}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedMember.name}</Text>
              <Text style={styles.modalText}>NIM: {selectedMember.id}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16, // Padding konsisten di seluruh container
  },
  section: {
    marginBottom: 24,
    padding: 20, // Padding lebih besar untuk kesan lebih bersih
    backgroundColor: '#fff', // Background putih untuk setiap section
    borderRadius: 8, // Sudut yang membulat pada setiap section
    elevation: 4, // Shadow pada Android
    shadowColor: '#000', // Shadow pada iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20, // Ukuran font lebih besar untuk judul section
    fontWeight: '600', // Berat font lebih ringan untuk kesan modern
    marginBottom: 12, // Spacing lebih besar untuk judul
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Jarak antar baris lebih baik untuk keterbacaan
    textAlign: 'justify', // Penataan teks untuk keterbacaan yang lebih baik
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fffe',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  touchable: {
    alignItems: 'center',
    padding: 20,
  },
  cardImage: {
    width: 100, // Ukuran gambar disesuaikan agar lebih pas
    height: 100,
    borderRadius: 50, // Gambar berbentuk bulat
    marginBottom: 12,
    borderWidth: 2, // Tambahkan border untuk kesan lebih rapi
    borderColor: '#ddd', // Warna border lebih terang
  },
  cardTitle: {
    fontSize: 16, // Ukuran font disesuaikan
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14, // Ukuran font sedikit lebih kecil
    color: '#777', // Warna font lebih lembut untuk keterbacaan
    textAlign: 'center',
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Latar belakang gelap untuk modal
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
