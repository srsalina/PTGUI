import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ActivityIcon, LockIcon, NetworkIcon, SendIcon, ShieldIcon, WifiIcon } from "lucide-react"

export default function PenTestGUI() {
    const [scanProgress, setScanProgress] = useState(0)
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to PenTest AI Assistant. How can I help you today?", sender: 'ai' }
    ])
    const [inputMessage, setInputMessage] = useState("")

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages(prev => [...prev, { id: prev.length + 1, text: inputMessage, sender: 'user' }])
            setInputMessage("")
            // Simulate AI response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: prev.length + 1,
                    text: "I've received your message. How would you like to proceed with the penetration test?",
                    sender: 'ai'
                }])
            }, 1000)
        }
    }

    return (
        <div className="flex h-screen text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-red-600 to-orange-500 p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-6">PenTest GUI</h1>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="target">Target IP</Label>
                        <Input id="target" placeholder="192.168.1.1" className="bg-white/10 border-white/20" />
                    </div>
                    <div>
                        <Label htmlFor="scan-type">Scan Type</Label>
                        <Select>
                            <SelectTrigger id="scan-type" className="bg-white/10 border-white/20">
                                <SelectValue placeholder="Select scan type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="port">Port Scan</SelectItem>
                                <SelectItem value="vulnerability">Vulnerability Scan</SelectItem>
                                <SelectItem value="network">Network Mapping</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="intensity">Scan Intensity</Label>
                        <Slider
                            id="intensity"
                            min={1}
                            max={10}
                            step={1}
                            defaultValue={[5]}
                            className="py-4"
                        />
                    </div>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">Start Scan</Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gradient-to-br from-red-800 to-orange-700 p-6 flex">
                <div className="flex-1 bg-black/20 rounded-lg p-4 mr-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Network Visualization</h2>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            <NetworkIcon size={200} className="text-blue-300" />
                            <LockIcon size={40} className="absolute top-1/4 left-1/4 text-red-500" />
                            <WifiIcon size={40} className="absolute top-1/4 right-1/4 text-green-500" />
                            <ShieldIcon size={40} className="absolute bottom-1/4 left-1/3 text-yellow-500" />
                            <ActivityIcon size={40} className="absolute bottom-1/4 right-1/3 text-purple-500" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="progress">Scan Progress</Label>
                        <div className="bg-black/30 rounded-full h-4 mt-2">
                            <div
                                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${scanProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Chatbox */}
                <div className="w-80 bg-black/20 rounded-lg p-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
                    <div className="flex-1 overflow-y-auto mb-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`mb-2 p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 ml-auto' : 'bg-gray-700'
                                    } max-w-[80%]`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-white/10 border-white/20 mr-2"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                            <SendIcon size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
