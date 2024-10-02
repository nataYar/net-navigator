'use client'

const Recommendations = ({ replies, getRecommendations, panel, openPanel }) => {
    
    const getRecommendation = () => {
        const { connectionType, userCount, activities, deviceCount, buildingSize } = replies;
      
        const newRecommendations = {
            router: '',
            coverage: '',
            additional: [],
            routerDetails: [],
          };

        // Step 1: Base Router Type by Connection Type
        switch (connectionType) {
          case "Fiber Optic":
            newRecommendations.router = "High-speed fiber-compatible router";
            break;
          case "Cable Internet (Coaxial)":
            newRecommendations.router = "Standard cable router";
            break;
          case "DSL (Digital Subscriber Line)":
            newRecommendations.router = "DSL modem/router combo";
            break;
          case "5G Home Internet":
            newRecommendations.router = "5G router with SIM slot";
            break;
          case "Satellite":
            newRecommendations.router = "Satellite-compatible router";
            break;
          default:
            newRecommendations.router = "Standard router";
        }
        if (connectionType === "DSL (Digital Subscriber Line)") {
            if ((userCount === "2-4 Users" || deviceCount === "6-10 Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "DSL modem/router combo for moderate users and device load";
            } else if ((userCount === "5-8 Users" || deviceCount === "11+ Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "DSL modem/router combo with higher capacity for heavier load";
            } else if (userCount === "9+ Users") {
                newRecommendations.router = "Tri-band router or Mesh system suitable for DSL for heavy traffic";
            }
        } else if (connectionType === "5G Home Internet") {
            if ((userCount === "2-4 Users" || deviceCount === "6-10 Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "5G router with moderate capacity for multiple users";
            } else if ((userCount === "5-8 Users" || deviceCount === "11+ Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "High-capacity 5G router for more devices and users";
            } else if (userCount === "9+ Users") {
                newRecommendations.router = "Tri-band 5G router or Mesh system for heavy traffic";
            }
        } else if (connectionType === "Satellite") {
            if ((userCount === "2-4 Users" || deviceCount === "6-10 Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "Standard satellite-compatible router for moderate use";
            } else if ((userCount === "5-8 Users" || deviceCount === "11+ Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "High-capacity satellite router for larger device loads";
            } else if (userCount === "9+ Users") {
                newRecommendations.router = "Tri-band router or Mesh system designed for satellite connections";
            }
        } else if (connectionType === "Fiber Optic") {
            if ((userCount === "2-4 Users" || deviceCount === "6-10 Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "High-speed fiber-compatible router for moderate users";
            } else if ((userCount === "5-8 Users" || deviceCount === "11+ Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "High-capacity fiber router for heavy load";
            } else if (userCount === "9+ Users") {
                newRecommendations.router = "Tri-band router or Mesh system optimized for fiber connections";
            }
        } else if (connectionType === "Cable Internet (Coaxial)") {
            if ((userCount === "2-4 Users" || deviceCount === "6-10 Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "Standard cable modem/router combo for moderate users";
            } else if ((userCount === "5-8 Users" || deviceCount === "11+ Devices") && newRecommendations.router !== "Mesh WiFi system") {
                newRecommendations.router = "High-capacity cable router for heavy load";
            } else if (userCount === "9+ Users") {
                newRecommendations.router = "Tri-band router or Mesh system designed for cable internet connections";
            }
        }
        
      
        // Step 3: Building Size & Coverage
        if (buildingSize === "Less than 1,000 sq ft") {
          newRecommendations.coverage = "No extenders needed for small space";
        } else if (buildingSize === "1,000 - 2,000 sq ft") {
          newRecommendations.coverage = "Optional WiFi extenders";
        } else if (buildingSize === "More than 2,000 sq ft") {
          newRecommendations.router = "Mesh WiFi system";  // Overwrite router for large spaces
          newRecommendations.coverage = "Mesh WiFi system for large areas. Consider adding additional access points for better coverage (APs require a wired connection to the router)";
        }
      
        // Step 4: Additional Features based on Activities (no new router recommendation)
        if (activities.includes("Online gaming")) {
          newRecommendations.additional.push("Ensure low latency features (for gaming)");
        }
        if (activities.includes("Video conferencing")) {
          newRecommendations.additional.push("Prioritize QoS (Quality of Service) for stable conferencing");
        }
        if (activities.includes("Streaming video (HD/4K)")) {
          newRecommendations.additional.push("Good bandwidth for HD/4K streaming");
        }
      
        const standardRouter = [
            "for average home use",
            "Wi-Fi Standard: Wi-Fi 4 (802.11n) or Wi-Fi 5 (802.11ac)",
            "Speed: Up to 600 Mbps (Wi-Fi 4) or 1,200 - 1,750 Mbps (Wi-Fi 5)",
            "Antennas: 1-2 antennas",
            "Device Handling: 8-10 devices",
            "MU-MIMO Support: Basic or no support",
            "QoS: Basic settings",
            "Price: More affordable",
            "Example: TP-Link TL-WR841N (300 Mbps) or Netgear R6080 (Dual-Band, 1,500 Mbps)"
        ];
    
          const moderateCapacityRouter = [
            "for fewer users/devices",
            "Wi-Fi Standard: Wi-Fi 5 (802.11ac)",
            "Speed: Up to 1,200 - 1,300 Mbps",
            "Antennas: 2-3 antennas",
            "Device Handling: 10-15 devices",
            "MU-MIMO Support: Basic or 2x2 streams",
            "QoS: Basic settings",
            "Price: More affordable",
            "Example: TP-Link Archer A7 (AC1750)"
          ]
    
          const highCapacityRouter = [
            "for many users/devices",
            "Wi-Fi Standard: Wi-Fi 6 (802.11ax)",
            "Speed: 1,800 - 3,000+ Mbps",
            "Antennas: 4 or more antennas",
            "Device Handling: 25+ devices",
            "MU-MIMO Support: 4x4 streams or more",
            "QoS: Advanced, granular control",
            "Price: Higher cost",
            "Example: Asus RT-AX86U (Wi-Fi 6)"
          ]

        // Step 6: Search for keywords in newRecommendations.router
        if (newRecommendations.router.toLowerCase().includes("moderate")) {
            newRecommendations.routerDetails = moderateCapacityRouter;
        } else if (newRecommendations.router.toLowerCase().includes("high")) {
            newRecommendations.routerDetails = highCapacityRouter;
        } else if (newRecommendations.router.toLowerCase().includes("standard")) {
            newRecommendations.routerDetails = standardRouter;
        } else {
            newRecommendations.routerDetails = standardRouter; // Default to standard if no match
        }
        if(!panel){ openPanel() }
        getRecommendations(newRecommendations);
      };
      

      
  return (
    <div className="w-fit mx-auto">
        <button
            onClick={getRecommendation}
            className="bg-red-600 text-white px-6 py-3 rounded-md shadow-lg"
            >
            Get Network Recommendations
        </button>
    </div>
  )
}

export default Recommendations