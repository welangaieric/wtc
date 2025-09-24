// Navigation and Mobile Menu
class Navigation {
  constructor() {
    this.nav = document.querySelector(".nav")
    this.navToggle = document.querySelector(".nav-toggle")
    this.navLinks = document.querySelector(".nav-links")
    this.navLinkItems = document.querySelectorAll(".nav-links a")
    this.isMenuOpen = false
    this.init()
  }

  init() {
    this.setupScrollEffect()
    this.setupMobileMenu()
    this.setupSmoothScrolling()
    this.setupActiveLinks()
  }

  setupScrollEffect() {
    let ticking = false

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            if (window.scrollY > 50) {
              this.nav.style.background = "rgba(255, 255, 255, 0.98)"
              this.nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
            } else {
              this.nav.style.background = "rgba(255, 255, 255, 0.95)"
              this.nav.style.boxShadow = "none"
            }
            ticking = false
          })
          ticking = true
        }
      },
      { passive: true },
    )
  }

  setupMobileMenu() {
    this.navToggle.addEventListener("click", () => {
      this.toggleMenu()
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.nav.contains(e.target)) {
        this.closeMenu()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  openMenu() {
    this.navLinks.style.display = "flex"
    this.navLinks.style.position = "fixed"
    this.navLinks.style.top = "70px"
    this.navLinks.style.left = "0"
    this.navLinks.style.right = "0"
    this.navLinks.style.background = "var(--white)"
    this.navLinks.style.flexDirection = "column"
    this.navLinks.style.padding = "var(--space-8)"
    this.navLinks.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    this.navLinks.style.zIndex = "999"

    this.navToggle.classList.add("active")
    this.isMenuOpen = true
    document.body.style.overflow = "hidden"
  }

  closeMenu() {
    this.navLinks.style.display = ""
    this.navLinks.style.position = ""
    this.navLinks.style.top = ""
    this.navLinks.style.left = ""
    this.navLinks.style.right = ""
    this.navLinks.style.background = ""
    this.navLinks.style.flexDirection = ""
    this.navLinks.style.padding = ""
    this.navLinks.style.boxShadow = ""
    this.navLinks.style.zIndex = ""

    this.navToggle.classList.remove("active")
    this.isMenuOpen = false
    document.body.style.overflow = ""
  }

  setupSmoothScrolling() {
    this.navLinkItems.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })

          if (this.isMenuOpen) {
            this.closeMenu()
          }
        }
      })
    })
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll("section")
    let ticking = false

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollPos = window.scrollY + 100

            sections.forEach((section) => {
              const sectionTop = section.offsetTop
              const sectionHeight = section.offsetHeight
              const sectionId = section.getAttribute("id")

              if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinkItems.forEach((link) => {
                  link.classList.remove("active")
                  if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active")
                  }
                })
              }
            })
            ticking = false
          })
          ticking = true
        }
      },
      { passive: true },
    )
  }
}

// Hero Section Animations
class HeroAnimations {
  constructor() {
    this.heroTitle = document.querySelector(".hero-title")
    this.titleLines = document.querySelectorAll(".title-line")
    this.heroSubtitle = document.querySelector(".hero-subtitle")
    this.ctaButton = document.querySelector(".cta-primary")
    this.heroImages = document.querySelector(".hero-images")
    this.init()
  }

  init() {
    this.animateHeroElements()
    this.setupImageHovers()
  }

  animateHeroElements() {
    // Animate title lines
    this.titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1"
        line.style.transform = "translateY(0)"
      }, index * 200)
    })

    // Animate subtitle
    setTimeout(() => {
      if (this.heroSubtitle) {
        this.heroSubtitle.style.opacity = "1"
      }
    }, 700)

    // Animate CTA button
    setTimeout(() => {
      if (this.ctaButton) {
        this.ctaButton.style.opacity = "1"
      }
    }, 900)

    // Animate hero images
    setTimeout(() => {
      if (this.heroImages) {
        this.heroImages.style.opacity = "1"
      }
    }, 1100)
  }

  setupImageHovers() {
    const gridImages = document.querySelectorAll(".grid-image")
    gridImages.forEach((image) => {
      image.addEventListener("mouseenter", () => {
        // image.style.filter = "grayscale(0%) contrast(1)"
        image.style.transform = "scale(1.02)"
      })

      image.addEventListener("mouseleave", () => {
        // image.style.filter = "grayscale(100%) contrast(1.1)"
        image.style.transform = "scale(1)"
      })
    })
  }
}

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scroll-indicator").style.width = scrollPercent + "%";
  });


// Interactive Values Cards for Mobile
class ValuesInteraction {
  constructor() {
    this.valuesStack = document.querySelector(".values-stack")
    this.valueCards = document.querySelectorAll(".value-card")
    this.currentIndex = 0
    this.autoFlipInterval = null
    this.isMobile = window.innerWidth < 768
    this.init()
  }

  init() {
    this.setupCards()
    this.setupInteractions()
    this.setupResizeListener()

    if (this.isMobile && this.valueCards.length > 0) {
      this.startAutoFlip()
    }
  }

  setupCards() {
    this.valueCards.forEach((card, index) => {
      if (index === 0) {
        card.classList.add("active")
      }
      card.style.zIndex = this.valueCards.length - index
      card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`
    })
  }

  setupInteractions() {
    if (!this.isMobile) return

    this.valueCards.forEach((card, index) => {
      // Touch interactions
      let startX = 0
      let startY = 0
      let isDragging = false

      card.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX
          startY = e.touches[0].clientY
          isDragging = true
          this.stopAutoFlip()
        },
        { passive: true },
      )

      card.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging) return

          const currentX = e.touches[0].clientX
          const currentY = e.touches[0].clientY
          const diffX = Math.abs(startX - currentX)
          const diffY = Math.abs(startY - currentY)

          if (diffX > diffY && diffX > 10) {
            e.preventDefault()
          }
        },
        { passive: false },
      )

      card.addEventListener(
        "touchend",
        (e) => {
          if (!isDragging) return
          isDragging = false

          const currentX = e.changedTouches[0].clientX
          const diffX = startX - currentX

          if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
              this.flipCard()
            }
          }

          setTimeout(() => this.startAutoFlip(), 2000)
        },
        { passive: true },
      )

      // Click interaction
      card.addEventListener("click", () => {
        if (card.classList.contains("active")) {
          this.flipCard()
        }
      })
    })
  }

  flipCard() {
    if (!this.isMobile) return

    const activeCard = document.querySelector(".value-card.active")
    if (!activeCard) return

    // Remove active class and animate out
    activeCard.classList.remove("active")
    activeCard.style.transform = "translateX(-100%) rotateY(180deg) scale(0.8)"
    activeCard.style.opacity = "0"
    activeCard.style.zIndex = "0"

    // Find next card
    this.currentIndex = (this.currentIndex + 1) % this.valueCards.length
    const nextCard = this.valueCards[this.currentIndex]

    // Reorder all cards
    setTimeout(() => {
      this.reorderCards()
      nextCard.classList.add("active")
    }, 300)
  }

  reorderCards() {
    this.valueCards.forEach((card, index) => {
      const adjustedIndex = (index - this.currentIndex + this.valueCards.length) % this.valueCards.length

      card.style.transform = `translateY(${adjustedIndex * 10}px) scale(${1 - adjustedIndex * 0.02})`
      card.style.zIndex = this.valueCards.length - adjustedIndex
      card.style.opacity = "1"

      if (adjustedIndex === 0) {
        card.classList.add("active")
      } else {
        card.classList.remove("active")
      }
    })
  }

  startAutoFlip() {
    if (!this.isMobile) return

    this.stopAutoFlip()
    this.autoFlipInterval = setInterval(() => {
      this.flipCard()
    }, 4000)
  }

  stopAutoFlip() {
    if (this.autoFlipInterval) {
      clearInterval(this.autoFlipInterval)
      this.autoFlipInterval = null
    }
  }

  setupResizeListener() {
    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile
      this.isMobile = window.innerWidth < 768

      if (wasMobile && !this.isMobile) {
        // Switched to desktop
        this.stopAutoFlip()
        this.resetCards()
        this.valuesStack.style.display = "none"
        document.querySelector(".values-desktop").style.display = "block"
      } else if (!wasMobile && this.isMobile) {
        // Switched to mobile
        this.valuesStack.style.display = "block"
        document.querySelector(".values-desktop").style.display = "none"
        this.setupCards()
        this.setupInteractions()
        this.startAutoFlip()
      }
    })
  }

  resetCards() {
    this.valueCards.forEach((card, index) => {
      card.classList.remove("active")
      card.style.transform = ""
      card.style.zIndex = ""
      card.style.opacity = ""
    })
    this.currentIndex = 0
  }
}

// Gallery Carousel
class GalleryCarousel {
  constructor() {
    this.track = document.getElementById("carousel-track")
    this.prevBtn = document.getElementById("carousel-prev")
    this.nextBtn = document.getElementById("carousel-next")
    this.dots = document.querySelectorAll(".dot")
    this.slides = document.querySelectorAll(".carousel-slide")
    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null
    this.isTransitioning = false
    this.init()
  }

  init() {
    if (!this.track || this.totalSlides === 0) return

    this.setupEventListeners()
    this.updateCarousel()
    this.startAutoPlay()
  }

  setupEventListeners() {
    // Navigation buttons
    this.prevBtn?.addEventListener("click", () => {
      if (!this.isTransitioning) this.prevSlide()
    })

    this.nextBtn?.addEventListener("click", () => {
      if (!this.isTransitioning) this.nextSlide()
    })

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!this.isTransitioning) this.goToSlide(index)
      })
    })

    // Touch/swipe support
    this.setupTouchEvents()

    // Pause on hover
    const carouselContainer = this.track.parentElement
    carouselContainer.addEventListener("mouseenter", () => this.stopAutoPlay())
    carouselContainer.addEventListener("mouseleave", () => this.startAutoPlay())

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.isTransitioning) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        this.prevSlide()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        this.nextSlide()
      }
    })
  }

  setupTouchEvents() {
    let startX = 0
    let currentX = 0
    let isDragging = false

    this.track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX
        isDragging = true
        this.stopAutoPlay()
      },
      { passive: true },
    )

    this.track.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return
        currentX = e.touches[0].clientX

        const diffX = Math.abs(startX - currentX)
        if (diffX > 10) {
          e.preventDefault()
        }
      },
      { passive: false },
    )

    this.track.addEventListener(
      "touchend",
      (e) => {
        if (!isDragging) return
        isDragging = false

        const diffX = startX - currentX

        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.nextSlide()
          } else {
            this.prevSlide()
          }
        }

        setTimeout(() => this.startAutoPlay(), 1000)
      },
      { passive: true },
    )
  }

  nextSlide() {
    if (this.isTransitioning) return
    this.isTransitioning = true
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides
    this.updateCarousel()
  }

  prevSlide() {
    if (this.isTransitioning) return
    this.isTransitioning = true
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.updateCarousel()
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return
    this.isTransitioning = true
    this.currentSlide = index
    this.updateCarousel()
  }

  updateCarousel() {
    const translateX = -this.currentSlide * 100
    this.track.style.transform = `translateX(${translateX}%)`

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })

    // Reset transition flag
    setTimeout(() => {
      this.isTransitioning = false
    }, 500)
  }

  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            this.observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    this.init()
  }

  init() {
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll(
      ".about-text p, .service-item, .value-item, .team-text, .contact-item",
    )

    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      this.observer.observe(el)
    })
  }
}

// Service Interactions
class ServiceInteractions {
  constructor() {
    this.serviceItems = document.querySelectorAll(".service-item")
    this.init()
  }

  init() {
    this.serviceItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-4px)"
        item.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)"
      })

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0)"
        item.style.boxShadow = "none"
      })
    })
  }
}

// CTA Button Interactions
class CTAInteractions {
  constructor() {
    this.ctaButtons = document.querySelectorAll(".cta-primary, .cta-secondary")
    this.init()
  }

  init() {
    this.ctaButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Create ripple effect
        const ripple = document.createElement("span")
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.style.position = "absolute"
        ripple.style.borderRadius = "50%"
        ripple.style.background = "rgba(255, 255, 255, 0.3)"
        ripple.style.transform = "scale(0)"
        ripple.style.animation = "ripple 0.6s linear"
        ripple.style.pointerEvents = "none"

        button.style.position = "relative"
        button.style.overflow = "hidden"
        button.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })

    // Add ripple animation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navigation()
  new HeroAnimations()
  new ValuesInteraction()
  new GalleryCarousel()
  new ScrollAnimations()
  new ServiceInteractions()
  new CTAInteractions()

  // Add loaded class for any CSS animations
  document.body.classList.add("loaded")
})

// Handle window resize
window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout)
  window.resizeTimeout = setTimeout(() => {
    // Trigger resize events for components that need it
    window.dispatchEvent(new Event("optimizedResize"))
  }, 250)
})
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > window.innerHeight) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
const canvas = document.getElementById("nav-particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1.5;
    this.speedY = Math.random() * 0.4 + 0.2;
    this.alpha = Math.random() * 0.3 + 0.2;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha})`; // mustard
    ctx.fill();
  }
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

initParticles(30); // adjust density
animate();