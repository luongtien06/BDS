// Enhanced listings data
    const listings = [
      {
        id: 1,
        title: "Bán căn hộ 2PN Vinhomes Grand Park",
        price: "2.5 tỷ",
        priceNum: 2.5,
        location: "Quận 9, TP.HCM",
        details: "70m², 2 PN, 2 WC",
        area: 70,
        bedrooms: 2,
        bathrooms: 2,
        image: "🏢",
        type: "buy",
        category: "apartment",
        owner: "Anh Tuấn",
        time: "2 giờ trước",
        featured: false
      },
      {
        id: 2,
        title: "Cho thuê căn hộ 3PN Landmark 81",
        price: "25 tr/tháng",
        priceNum: 0.025,
        location: "Bình Thạnh, TP.HCM",
        details: "100m², 3 PN, 2 WC",
        area: 100,
        bedrooms: 3,
        bathrooms: 2,
        image: "🏙️",
        type: "rent",
        category: "apartment",
        owner: "Chị Mai",
        time: "5 giờ trước",
        featured: true
      },
      {
        id: 3,
        title: "Bán biệt thự Thảo Điền sang trọng",
        price: "28 tỷ",
        priceNum: 28,
        location: "Quận 2, TP.HCM",
        details: "250m², 5 PN, 4 WC",
        area: 250,
        bedrooms: 5,
        bathrooms: 4,
        image: "🏰",
        type: "buy",
        category: "villa",
        owner: "Anh Hùng",
        time: "1 ngày trước",
        featured: true
      },
      {
        id: 4,
        title: "Cho thuê nhà phố Nguyễn Văn Linh",
        price: "20 tr/tháng",
        priceNum: 0.02,
        location: "Quận 7, TP.HCM",
        details: "120m², 4 PN, 3 WC",
        area: 120,
        bedrooms: 4,
        bathrooms: 3,
        image: "🏠",
        type: "rent",
        category: "house",
        owner: "Chị Lan",
        time: "3 giờ trước",
        featured: false
      },
      {
        id: 5,
        title: "Bán đất nền KDC Phú Mỹ Hưng",
        price: "5.8 tỷ",
        priceNum: 5.8,
        location: "Quận 7, TP.HCM",
        details: "100m², Sổ đỏ chính chủ",
        area: 100,
        bedrooms: 0,
        bathrooms: 0,
        image: "🌾",
        type: "buy",
        category: "land",
        owner: "Anh Dũng",
        time: "4 giờ trước",
        featured: false
      },
      {
        id: 6,
        title: "Bán căn hộ 3PN Masteri Thảo Điền",
        price: "4.2 tỷ",
        priceNum: 4.2,
        location: "Quận 2, TP.HCM",
        details: "85m², 3 PN, 2 WC",
        area: 85,
        bedrooms: 3,
        bathrooms: 2,
        image: "🏢",
        type: "buy",
        category: "apartment",
        owner: "Chị Thảo",
        time: "6 giờ trước",
        featured: true
      },
      {
        id: 7,
        title: "Cho thuê văn phòng Quận 1",
        price: "35 tr/tháng",
        priceNum: 0.035,
        location: "Quận 1, TP.HCM",
        details: "150m², Tầng 15, View đẹp",
        area: 150,
        bedrooms: 0,
        bathrooms: 2,
        image: "🏬",
        type: "rent",
        category: "office",
        owner: "Anh Minh",
        time: "8 giờ trước",
        featured: false
      },
      {
        id: 8,
        title: "Bán nhà mặt tiền Lê Văn Sỹ",
        price: "15 tỷ",
        priceNum: 15,
        location: "Quận 3, TP.HCM",
        details: "80m², 4 PN, 4 WC",
        area: 80,
        bedrooms: 4,
        bathrooms: 4,
        image: "🏠",
        type: "buy",
        category: "house",
        owner: "Chị Hương",
        time: "1 ngày trước",
        featured: false
      }
    ];

    let currentListings = [...listings];
    let savedListings = [];

    // Display listings
    function displayListings(listingsToShow) {
      const listingGrid = document.getElementById("listing-grid");
      listingGrid.innerHTML = "";
      
      if (listingsToShow.length === 0) {
        listingGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666; grid-column: 1/-1;">Không tìm thấy kết quả phù hợp. Vui lòng thử lại với từ khóa khác.</p>';
        return;
      }

      listingsToShow.forEach((listing) => {
        const isSaved = savedListings.includes(listing.id);
        const card = `
          <div class="listing-card">
            <div class="listing-image">
              ${listing.image}
              <div class="listing-badge ${listing.type}">${listing.type === 'buy' ? 'Bán' : 'Thuê'}</div>
              ${listing.featured ? '<div class="listing-featured">⭐ Nổi bật</div>' : ''}
            </div>
            <div class="content">
              <h3>${listing.title}</h3>
              <p class="price">${listing.price}</p>
              <p class="details">
                <span class="detail-item">📐 ${listing.area}m²</span>
                ${listing.bedrooms > 0 ? `<span class="detail-item">🛏️ ${listing.bedrooms} PN</span>` : ''}
                ${listing.bathrooms > 0 ? `<span class="detail-item">🚿 ${listing.bathrooms} WC</span>` : ''}
              </p>
              <p class="details">📍 ${listing.location}</p>
              <div class="listing-meta">
                <div class="listing-owner">
                  <div class="avatar">${listing.owner.charAt(listing.owner.length - 1)}</div>
                  <span>${listing.owner}</span>
                </div>
                <span>${listing.time}</span>
              </div>
              <div class="buttons">
                <button class="contact" onclick="contactOwner(${listing.id})">📞 Liên Hệ</button>
                <button class="save ${isSaved ? 'saved' : ''}" onclick="toggleSave(${listing.id})">
                  ${isSaved ? '❤️ Đã lưu' : '🤍 Lưu tin'}
                </button>
              </div>
            </div>
          </div>
        `;
        listingGrid.innerHTML += card;
      });
    }

    // Contact owner
    function contactOwner(id) {
      const listing = listings.find(l => l.id === id);
      alert(`Liên hệ: 0909 ${Math.floor(Math.random() * 900000 + 100000)}\n\n"${listing.title}"\n${listing.price}`);
    }

    // Toggle save listing
    function toggleSave(id) {
      const index = savedListings.indexOf(id);
      if (index > -1) {
        savedListings.splice(index, 1);
      } else {
        savedListings.push(id);
      }
      displayListings(currentListings);
    }

    // Search functionality
    document.getElementById("search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = document.getElementById("keyword").value.toLowerCase();
      const location = document.getElementById("location").value;
      const propertyType = document.getElementById("property-type").value;
      const priceRange = document.getElementById("price-range").value;

      currentListings = listings.filter((listing) => {
        const matchKeyword = keyword === "" || listing.title.toLowerCase().includes(keyword) || listing.location.toLowerCase().includes(keyword);
        const matchLocation = location === "" || listing.location.includes(location);
        const matchType = propertyType === "" || listing.category === propertyType;
        
        let matchPrice = true;
        if (priceRange && listing.type === 'buy') {
          if (priceRange === '0-2') matchPrice = listing.priceNum < 2;
          else if (priceRange === '2-5') matchPrice = listing.priceNum >= 2 && listing.priceNum < 5;
          else if (priceRange === '5-10') matchPrice = listing.priceNum >= 5 && listing.priceNum < 10;
          else if (priceRange === '10+') matchPrice = listing.priceNum >= 10;
        }

        return matchKeyword && matchLocation && matchType && matchPrice;
      });

      displayListings(currentListings);
      
      // Scroll to results
      document.getElementById("listing-grid").scrollIntoView({ behavior: 'smooth' });
    });

    // Switch search tab
    function switchSearchTab(type) {
      const tabs = document.querySelectorAll('.search-tabs .tab-btn');
      tabs.forEach(tab => tab.classList.remove('active'));
      event.target.classList.add('active');
    }

    // Filter by type
    function filterByType(type) {
      currentListings = listings.filter(l => l.type === type);
      displayListings(currentListings);
      document.getElementById("listing-grid").scrollIntoView({ behavior: 'smooth' });
    }

    // Filter by category
    function filterByCategory(category) {
      currentListings = listings.filter(l => l.category === category);
      displayListings(currentListings);
      document.getElementById("listing-grid").scrollIntoView({ behavior: 'smooth' });
    }

    // Quick filter
    function quickFilter(filter) {
      event.target.classList.toggle('active');
      
      if (filter === 'featured') {
        currentListings = listings.filter(l => l.featured);
      } else if (filter === 'new') {
        currentListings = [...listings].sort((a, b) => a.id - b.id).slice(0, 4);
      } else if (filter === 'cheap') {
        currentListings = listings.filter(l => l.type === 'buy' && l.priceNum < 5);
      } else if (filter === 'luxury') {
        currentListings = listings.filter(l => l.priceNum > 10);
      } else {
        currentListings = [...listings];
      }
      
      displayListings(currentListings);
    }

    // Sort listings
    function sortListings(sortBy) {
      if (sortBy === 'price-low') {
        currentListings.sort((a, b) => a.priceNum - b.priceNum);
      } else if (sortBy === 'price-high') {
        currentListings.sort((a, b) => b.priceNum - a.priceNum);
      } else if (sortBy === 'area') {
        currentListings.sort((a, b) => b.area - a.area);
      } else {
        currentListings.sort((a, b) => a.id - b.id);
      }
      displayListings(currentListings);
    }

    // Change view
    function changeView(view) {
      const grid = document.getElementById("listing-grid");
      const btns = document.querySelectorAll('.view-btn');
      
      btns.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      if (view === 'list') {
        grid.classList.add('list-view');
      } else {
        grid.classList.remove('list-view');
      }
    }

    // Back to top button
    window.onscroll = function() {
      const btn = document.getElementById('backToTop');
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    };

    // Initialize
    displayListings(listings);